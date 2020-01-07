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
      }, {
        logo: 'https://cdn.v2ex.com/navatar/6353/8fe6/519_xxlarge.png?m=1537099731',
        title: '奇思妙想',
        desc: '让你的创意在这里自由流动吧。',
      }, {
        logo: 'https://cdn.v2ex.com/navatar/17e6/2166/43_xxlarge.png?m=1573619904',
        title: '酷工作',
        desc: '做有趣的有意义的事情。',
      }, {
        logo: 'https://cdn.v2ex.com/navatar/a87f/f679/4_xxlarge.png?m=1569533863',
        title: '音乐',
        desc: 'Music is an art form whose medium is sound and silence.',
      }, {
        logo: 'https://cdn.v2ex.com/navatar/d67d/8ab4/39_xxlarge.png?m=1575344918',
        title: 'Android',
        desc: '来自 Google 的开放源代码智能手机平台。',
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
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://pic1.zhimg.com/v2-d5964bcbadab90421fcb1d5fbf20eed3_r.jpg',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
          reply_count: 33,
          updated_at: 1578116579929,
          title: '明年自己注册个外包公司，怎么渠道接项目？',
          avatar: 'https://cdn.v2ex.com/avatar/851c/973d/181403_normal.png?m=1476685737',
          nickname: '李三',
          last_reply_nickname: 'koisf'
        },
        {
          id: 3,
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
}
