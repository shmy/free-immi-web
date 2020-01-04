import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
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
          avatar: 'https://cdn.v2ex.com/avatar/04bd/6810/163293_normal.png?m=1471705246',
          nickname: 'alloc',
          last_reply_nickname: 'nkcoder'
        },
        {
          id: 2,
          reply_count: 22,
          updated_at: 1578116579929,
          title: '想问问大家天天坐在电脑前，平时是如何保护自己的颈椎呢，最近这两天感觉颈椎痛有些加重了。才 20 岁可不想这么早落病根。',
          avatar: 'https://cdn.v2ex.com/gravatar/1b8f165c22a854ab5bd31dd0df35c8f0?s=48&d=retro',
          nickname: '周四',
          last_reply_nickname: '666'
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
      }, 500);
    });
  }
}
