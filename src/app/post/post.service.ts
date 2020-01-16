import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {HttpClient} from '@angular/common/http';
import {HasHttpResponseCustomError} from '../shared/http-interceptors/noop-interceptor';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }
  // public uploadImageByFile(file: File) {
  //   const fd = new FormData();
  //   fd.append('file', file);
  //   return this.httpClient.post<[any, HasHttpResponseCustomError]>('https://imgkr.com/api/files/upload', fd);
  // }
  public getImageSize(fileOrDataURL: File | string): Observable<{ width: number, height: number }> {

    return fromPromise(new Promise((resolve, reject) => {
      if (typeof fileOrDataURL === 'string') {
        loadImg(fileOrDataURL);
        return;
      }
      const fr = new FileReader();
      fr.onload = (e) => {
        // @ts-ignore
        loadImg(e.target.result);
      };
      fr.onerror = () => {
        reject();
      };
      fr.readAsDataURL(fileOrDataURL);
      function loadImg(src) {
        let img = new Image();
        img.onload = () => {
          resolve({width: img.width, height: img.height});
          img = null;
        };
        img.onerror = () => {
          img = null;
          reject();
        };
        // @ts-ignore
        img.src = src;
      }
    }));
  }
  public uploadImageByFile(file: File, width, height: number) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('width', width.toString());
    fd.append('height', height.toString());
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/images/upload/file', fd);
  }
  public uploadImageByDataURL(dataURL: string, width, height: number) {
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/images/upload/base64', {base64: dataURL, width, height});
  }
  public getPostPlateList() {
    return this.httpClient.get<[any, HasHttpResponseCustomError]>('/topic/group');
  }

  public getPostPagingListService(id: string, page: number, sortIndex: number) {
    const sorts = ['SUBMIT_AT', 'LIKE_COUNT', 'LAST_COMMENT_AT'];
    const sort = sorts[sortIndex] || sorts[0];
    return this.httpClient.get<[any, HasHttpResponseCustomError]>(`/topic/${id}/posts`, {
      params: {
        pageNum: page.toString(),
        pageSize: '20',
        sort,
      }
    });
  }
  public getPostDetailById(id: string) {
    return this.httpClient.get<[any, HasHttpResponseCustomError]>(`/post/${id}`);
  }
  public getPostDetailById1(id: string) {
    const result = {
      title: '全新單曲【我的新座位】不專心前傳Official Music Video',
      content: `
      <p>dsadsadsadsadasd<img data-id="0"></p><p><img data-id="1"><br></p><p><br></p><p><img data-id="2"></p><p><img data-id="3"></p><p><img data-id="3"></p><p><img data-id="3"></p><p><img data-id="3"></p><p><img data-id="3"></p><p><br></p>
      <p><img data-id="4"></p><p>dsadsadsadsadasd<img data-id="0"></p><p>dsadsadsadsadasd<img data-id="0"></p><p>dsadsadsadsadasd<img data-id="0"></p><p>dsadsadsadsadasd<img data-id="0"></p><p><br></p><p><br></p>
      <p>&lt;img src="https://tpc.googlesyndication.com/simgad/10949952014676677817" /&gt;</p><p><br></p><p><br></p>
      <p><strong style="font-size: 14px;">ds</strong><span style="font-size: 14px;">ad</span><span style="font-size: 14px; font-family: Hei;">asdadafds</span></p><p>fsd<span style="font-size: 20px; color: rgb(240, 102, 102);">d</span></p><p><span style="font-size: 20px; color: rgb(240, 102, 102);">fds</span><s style="font-size: 20px; color: rgb(240, 102, 102);">fdsf</s></p><p><br></p><p>&lt;img src="https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png"&gt;</p><p><br></p>
    `,
      urls: [
        {path: 'https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png', id: 0},
        {path: 'https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png', id: 1},
        {path: 'https://imgkr.cn-bj.ufileos.com/852d9c4a-1340-458a-b05a-ddd3351b12b2.jpg', id: 2},
        {path: 'https://imgkr.cn-bj.ufileos.com/694abf7a-6bf2-4f6f-8bec-59b86e286086.jpg', id: 3},
        {path: 'https://tpc.googlesyndication.com/simgad/10949952014676677817', id: 4},
      ],
    };
    return fromPromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    }));
  }

  public createPost(topicId: string, subject: string, content: string, imageIds: any[]) {
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/post', {
      topicId,
      subject,
      content,
      imageIds,
    });
  }
}
