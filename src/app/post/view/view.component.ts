import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import viewerJs from '../../shared/util/viewerjs.util';
import {RichEditorCustomTransform} from '../../shared/component/rich-editor/rich-editor-custom.transform';
import {ActivatedRoute} from '@angular/router';
import {of, Subject} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';

@Component({
  selector: 'app-detail',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  title = '';
  content = '';
  comment = '';
  @ViewChild('contentContainer', {static: false}) contentContainer;
  @ViewChild('container', {static: false}) container;
  status: LoadStatus = new LoadStatus();
  $getDetailStream = new Subject();

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private richEditorCustomTransform: RichEditorCustomTransform,
  ) {
  }

  ngOnInit() {
    this.$getDetailStream.pipe(
      tap(() => {
        this.status.setLoading();
      }),
      map(() => {
        const id: string = this.activatedRoute.snapshot.paramMap.get('id');
        return {id};
      }),
      switchMap((params) => {
        console.log(params);
        return this.postService.getPostDetailById(params.id).pipe(
          catchError(() => {
            this.status.setError();
            return of(null);
          })
        );
      }),
    ).subscribe(
      evt => {
        if (!evt) {
          return;
        }
        // @ts-ignore
        this.title = evt.title;
        // @ts-ignore
        this.content = this.richEditorCustomTransform.restore(evt.content, evt.urls);
        // @ts-ignore
        this.afterFetch(evt.urls);
        this.status.setLoaded();
      });
    this.activatedRoute.paramMap.subscribe(evt => {
      this.$getDetailStream.next();
    });
  }

  afterFetch(urls: any[]) {
    setTimeout(() => {
      this.container.nativeElement.scrollTop = 0;
      const items = this.contentContainer.nativeElement.querySelectorAll('img');
      items.forEach((item, index) => {
        item.style.cursor = 'zoom-in';
        item.addEventListener('click', () => {
          viewerJs(urls.map(t => ({url: t.url, alt: '描述' + index})), index);
        });
      });
    }, 0);
  }

  handleClick(e) {
    e.target.classList.add('like-active');
  }

  ngOnDestroy(): void {
    this.$getDetailStream.complete();
  }

}
