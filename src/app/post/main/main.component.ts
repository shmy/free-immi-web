import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {LoadStatus} from '../../shared/enum/load-status.enum';
import {of, Subject} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService) {
  }

  loadStatus: LoadStatus = new LoadStatus();
  items: any = [];
  $loadStream = new Subject();

  ngOnInit() {
    this.bindEvent();
  }

  bindEvent() {
    this.$loadStream.pipe(
      filter(() => {
        return this.loadStatus.notLoading;
      }),
      tap(() => {
        this.loadStatus.setLoading();
      }),
      switchMap(() => this.postService.getPostPlateList()),
    ).subscribe(([data, err]) => {
      if (err) {
        err.showToast();
        this.loadStatus.setError();
        return;
      }
      this.loadStatus.setLoaded();
      this.items = data;
    });
    this.$loadStream.next();
  }
  ngOnDestroy(): void {
    this.$loadStream.complete();
  }
}
