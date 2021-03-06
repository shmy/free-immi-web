import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';
import {fromEvent, of, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, distinct, filter, map, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  @ViewChild('container', {static: true}) container: ElementRef<HTMLDivElement> = null;
  loadStatus: LoadStatus = new LoadStatus();
  posts: any[] = [];
  $loadStream = new Subject<null>();
  $scroll: Subscription = null;
  page = 0;
  thresholdValue = 200;
  currentTabIndex = 0;

  ngOnInit() {
    this.bindEvent();
  }

  handleSetTabIndex(index: number) {
    this.currentTabIndex = index;
    this.page = 0;
    this.posts = [];
    this.$loadStream.next();
  }

  bindEvent() {
    this.$loadStream.pipe(
      filter((): boolean => {
        return this.loadStatus.notLoading;
      }),
      tap(() => {
        this.loadStatus.setLoading();
      }),
      map(() => {
        this.page++;
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        return {
          id,
          currentTabIndex: this.currentTabIndex,
          page: this.page,
        };
      }),
      switchMap((params) => this.postService
        .getPostPagingListService(params.id, params.page, params.currentTabIndex)),
    ).subscribe(([data, err]) => {
        if (err) {
          this.page--;
          this.loadStatus.setError();
          err.showToast();
          return;
        }
        this.loadStatus.setLoaded();
        // console.log(data)
        // @ts-ignore
        if (data.data.length) {
          this.posts = [...this.posts, ...data.data];
        }
        if ((this.page === 1 && this.posts.length === 0) || data.data.length === 0) {
          this.loadStatus.setNoMore();
        }
      }
    )
    ;
    this.activatedRoute.paramMap.subscribe(() => {
      this.page = 0;
      this.posts = [];
      this.$loadStream.next();
    });
    const el = this.container.nativeElement;
    this.$scroll = fromEvent(el, 'scroll')
      .pipe(
        debounceTime(100),
        filter(() => {
          const {height} = el.getBoundingClientRect();
          return el.scrollHeight !== 0 && (height + el.scrollTop >= el.scrollHeight - this.thresholdValue);
        }),
        distinct(),
      )
      .subscribe(() => {
        this.$loadStream.next();
      });
  }

  ngOnDestroy(): void {
    if (this.$scroll) {
      this.$scroll.unsubscribe();
    }
    this.$loadStream.complete();
  }
}
