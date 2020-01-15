import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {HttpClient} from '@angular/common/http';
import {HasHttpResponseCustomError} from '../shared/http-interceptors/noop-interceptor';

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
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/images/upload/file', fd);
  }
  public uploadImageByDataURL(dataURL: string) {
    return this.httpClient.post<[any, HasHttpResponseCustomError]>('/images/upload/base64', {base64: dataURL});
  }
  public getPostPlateList() {
    return this.httpClient.get<[any, HasHttpResponseCustomError]>('/topic/group');
  }

  public getPostPagingListService(id: string) {
    return this.httpClient.get<[any, HasHttpResponseCustomError]>(`/topic/${id}`);
  }

  public getPostDetailById(id: string) {
    const result = {
      title: '全新單曲【我的新座位】不專心前傳Official Music Video',
      content: `
      <p>dsadsadsadsadasd<img style="display: none" data-index="0"></p><p><img style="display: none" data-index="1"><br></p><p><br></p><p><img style="display: none" data-index="2"></p><p><img style="display: none" data-index="3"></p><p><br></p>
      <p><img style="display: none" data-index="4"></p><p><br></p><p><br></p>
      <p>&lt;img src="https://tpc.googlesyndication.com/simgad/10949952014676677817" /&gt;</p><p><br></p><p><br></p>
      <p><strong style="font-size: 14px;">ds</strong><span style="font-size: 14px;">ad</span><span style="font-size: 14px; font-family: Hei;">asdadafds</span></p><p>fsd<span style="font-size: 20px; color: rgb(240, 102, 102);">d</span></p><p><span style="font-size: 20px; color: rgb(240, 102, 102);">fds</span><s style="font-size: 20px; color: rgb(240, 102, 102);">fdsf</s></p><p><br></p><p>&lt;img src="https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png"&gt;</p><p><br></p>
    `,
      urls: [
        {url: 'https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png', width: 300, height: 46},
        {url: 'https://imgkr.cn-bj.ufileos.com/54ea2bf2-68f1-44c6-a192-d9dbb653e6ee.png', width: 300, height: 46},
        {url: 'https://imgkr.cn-bj.ufileos.com/852d9c4a-1340-458a-b05a-ddd3351b12b2.jpg', width: 1000, height: 1000},
        {url: 'https://imgkr.cn-bj.ufileos.com/694abf7a-6bf2-4f6f-8bec-59b86e286086.jpg', width: 5744, height: 3230},
        {url: 'https://tpc.googlesyndication.com/simgad/10949952014676677817', width: 728, height: 90},
      ],
    };
    return fromPromise(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    }));
  }
}
