import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, filter, tap} from 'rxjs/operators';

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
    // @ts-ignore
    this.posts = [...this.posts, ...data.data];
  }

  bind() {
    const el = this.container.nativeElement;
    const {height} = this.container.nativeElement.getBoundingClientRect();
    this.$scroll = fromEvent(el, 'scroll')
      .pipe(
        debounce(() => timer(300)),
        filter(event => {
          return (height + el.scrollTop >= el.scrollHeight - 60);
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
