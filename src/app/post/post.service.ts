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
  public uploadImageByFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('https://imgkr.com/api/files/upload', fd);
  }
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
  // public uploadImageByFile(file: File, width, height: number) {
  //   const fd = new FormData();
  //   fd.append('file', file);
  //   fd.append('width', width.toString());
  //   fd.append('height', height.toString());
  //   return this.httpClient.post<[any, HasHttpResponseCustomError]>('/images/upload/file', fd);
  // }
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
  public getPostDetailById1(id: string) {
    return this.httpClient.get<[any, HasHttpResponseCustomError]>(`/post/${id}`);
  }
  public getPostDetailById(id: string) {
    const result = {
      subject: '全新單曲【我的新座位】不專心前傳Official Music Video',
      content: `
      <p><img data-id="1" data-width="5744" data-height="3230"></p>
      <p><img data-id="1" data-width="285" data-height="175"></p>
      <p><img data-id="2" data-width="1060" data-height="400"></p>
      <p><img data-id="3" data-width="1000" data-height="1000"></p>
      <p><img data-id="3" data-width="1000" data-height="1000"></p>
      <p><img data-id="4" data-width="500" data-height="889"></p>
      <p><img data-id="4" data-width="500" data-height="889"></p>
        `,
      images: [
        {id: 1, path: 'https://pic1.zhimg.com/v2-2dc15037294f11389ade53b71fcdc760_r.jpg'},
        {id: 2, path: 'https://imgkr.cn-bj.ufileos.com/0153cba7-3ca2-4592-960d-73c44fd77cb3.png'},
        {id: 3, path: 'https://imgkr.cn-bj.ufileos.com/f9633803-26cd-4f79-bb49-d449bbd50159.jpg'},
        {id: 4, path: 'https://imgkr.cn-bj.ufileos.com/e4d2de39-0a37-47bf-b1bb-edb070a82ebe.jpg'},
      ],
    };
    return fromPromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([result, null]);
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
