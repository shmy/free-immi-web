import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
  ) {
  }

  loadStatus: LoadStatus = new LoadStatus();
  posts: any[] = [];
  $scroll: Subscription = null;

  ngOnInit() {
    this.bind();
    this.fetch();
  }

  async fetch() {
    if (this.loadStatus.isLoading) {
      return;
    }
    this.loadStatus.setLoading();
    const data = await this.postService.getPostPagingListService('1');
    this.loadStatus.setLoaded();
    this.posts = [...this.posts, ...data.data];
  }

  bind() {
    this.$scroll = fromEvent(window, 'scroll')
      .pipe(
        debounce(() => timer(300)),
        filter(event => {
          const windowHeight = window.innerHeight;
          const scrollHeight = document.documentElement.scrollHeight;
          const scrollTop = document.documentElement.scrollTop;
          if (windowHeight + scrollTop >= scrollHeight) {
            return true;
          }
        }),
        tap(() => {
          this.fetch();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.$scroll) {
      this.$scroll.unsubscribe();
    }
  }

}
