import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
  }

  public getPostPlateList() {
    const result = [
      {
        logo: 'https://cdn.v2ex.com/navatar/6cdd/60ea/184_large.png?m=1578038442',
        title: 'Apple 产品交流',
        desc: '设计了 Apple Watch，iPad，iPhone，iMac 及 MacBook Pro 等电子产品的美国公司。',
      },
      {
        logo: 'https://cdn.v2ex.com/navatar/b53b/3a3d/55_large.png?m=1550138353',
        title: '游戏',
        desc: 'Life is short, have more fun.',
      }, {
        logo: 'https://cdn.v2ex.com/navatar/c74d/97b0/16_xxlarge.png?m=1577243845',
        title: '分享发现',
        desc: '分享你看到的好玩的，有信息量的，欢迎从这里获取灵感。',
      }
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 2000);
    });
  }

  public getPostPagingListService(id: string) {
    console.log('getPostPagingListService');
    const result = {
      total: 100,
      data: [
        {
          id: 1,
          reply_count: 11,
          updated_at: 1578116965289,
          title: '买不到返程票，只能把回去的票也退了。',
          avatar: 'https://pic1.zhimg.com/v2-ef9d53e94f72225bc12c19e0070ba52d_r.jpg',
          nickname: 'alloc',
          last_reply_nickname: 'nkcoder'
        },
        {
          id: 2,
          reply_count: 22,
          updated_at: 1578116579929,
          title: '想问问大家天天坐在电脑前，平时是如何保护自己的颈椎呢，最近这两天感觉颈椎痛有些加重了。才 20 岁可不想这么早落病根。',
          avatar: 'https://pic2.zhimg.com/v2-ba0e453d2708b86d1f088ec28a49b1f7_r.jpg',
          nickname: '周四',
          last_reply_nickname: '666'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://pic4.zhimg.com/v2-213598158238e2f826fc6098370301a7_540x450.jpeg',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 4,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://pic1.zhimg.com/v2-d5964bcbadab90421fcb1d5fbf20eed3_r.jpg',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 5,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 6,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 7,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 8,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 9,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 10,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1500);
    });
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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 1500);
    });
  }
}
