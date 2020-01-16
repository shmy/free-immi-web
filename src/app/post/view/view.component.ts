import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import viewerJs from '../../shared/util/viewerjs.util';
import {RichEditorCustomTransform} from '../../shared/component/rich-editor/rich-editor-custom.transform';
import {ActivatedRoute} from '@angular/router';
import {of, Subject} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';
import imgLazyLoad from '../../shared/directive/img-lazy-load/img-lazy-load';

@Component({
  selector: 'app-detail',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  subject = '';
  content = '';
  comment = '';
  @ViewChild('contentContainer', {static: false}) contentContainer;
  @ViewChild('container', {static: false}) container;
  loadStatus: LoadStatus = new LoadStatus();
  $getDetailStream = new Subject();
  contentRendered = false;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private richEditorCustomTransform: RichEditorCustomTransform,
  ) {
  }

  ngOnInit() {
    this.$getDetailStream.pipe(
      tap(() => {

        this.contentRendered = false;
        this.loadStatus.setLoading();
      }),
      map(() => {
        const id: string = this.activatedRoute.snapshot.paramMap.get('id');
        return {id};
      }),
      switchMap((params) => this.postService.getPostDetailById(params.id)),
    ).subscribe(([data, err]) => {
      if (err) {
        this.loadStatus.setError();
        err.showToast();
        return;
      }
      this.subject = data.subject;
      this.content = this.richEditorCustomTransform.restore(data.content, data.images);
      this.afterFetch();
      this.loadStatus.setLoaded();
    });
    this.activatedRoute.paramMap.subscribe(() => {
      this.$getDetailStream.next();
    });
  }

  afterFetch() {
    setTimeout(() => {
      this.container.nativeElement.scrollTop = 0;
      const items = this.contentContainer.nativeElement.querySelectorAll('img');
      items.forEach((item) => {
        item.style.cursor = 'zoom-in';
        item.addEventListener('click', () => {
          // TODO: baseURL
          viewerJs([{url: item.dataset.lazySrc, alt: '描述'}], 0);
        });
        imgLazyLoad(item);
      });
      setTimeout(() => {
        this.contentRendered = true;
      }, 1000 / 60);
    }, 0);
    setTimeout(() => {
      // this.contentRendered = true;
    }, 500);

  }

  handleClick(e) {
    e.target.classList.add('like-active');
  }

  ngOnDestroy(): void {
    this.$getDetailStream.complete();
  }

}
