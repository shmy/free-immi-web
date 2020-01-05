import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinct, filter, tap} from 'rxjs/operators';

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
  @ViewChild('container', {static: true}) container: ElementRef<HTMLDivElement> = null;
  loadStatus: LoadStatus = new LoadStatus();
  posts: any[] = [];
  $scroll: Subscription = null;
  page = 0;
  thresholdValue = 200;

  ngOnInit() {
    this.bind();
    this.fetch();
  }

  async fetch() {
    this.page ++;
    if (this.loadStatus.isLoading) {
      return;
    }
    this.loadStatus.setLoading();
    const data = await this.postService.getPostPagingListService('1');
    this.loadStatus.setLoaded();
    // if (err) {
    //   this.page --;
    // }
    // @ts-ignore
    this.posts = [...this.posts, ...data.data];
  }

  bind() {
    const el = this.container.nativeElement;
    const {height} = this.container.nativeElement.getBoundingClientRect();
    this.$scroll = fromEvent(el, 'scroll')
      .pipe(
        debounceTime(100),
        filter(event => {
          return (height + el.scrollTop >= el.scrollHeight - this.thresholdValue);
        }),
        distinct(),
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
