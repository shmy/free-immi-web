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
  $loadSteam = new Subject<null>();
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
    this.$loadSteam.next();
  }

  bindEvent() {
    this.$loadSteam.pipe(
      filter((): boolean => {
        return this.loadStatus.isLdle || this.loadStatus.isLoaded;
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
      switchMap((params) => {
        console.log(params);
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        return this.postService
          .getPostPagingListService(id)
          .pipe(
            catchError(() => {
              this.page--;
              this.loadStatus.setError();
              return of(null);
            }),
          );
      }),
    ).subscribe(evt => {
      if (!evt) {
        return;
      }
      this.loadStatus.setLoaded();
      // @ts-ignore
      this.posts = [...this.posts, ...evt.data];
    });
    this.activatedRoute.paramMap.subscribe(() => {
      this.$loadSteam.next();
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
        this.$loadSteam.next();
      });
  }

  ngOnDestroy(): void {
    if (this.$scroll) {
      this.$scroll.unsubscribe();
    }
    this.$loadSteam.complete();
  }
}
