import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from "../post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit, AfterViewInit {
  title = '';
  content = '';
  @ViewChild('titleInput', {static: true}) titleInput;
  @ViewChild('richEditorComponent', {static: true}) richEditorComponent;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    }, 0);
  }
  async handleSubmit() {
    const { content, imageIds } = this.richEditorComponent.getRichText();
    const topicId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(content, imageIds);
    // this.postService.createPost(topicId, this.title, content, imageIds)
    //   .subscribe(([data, err]) => {
    //     console.log(data, err);
    //   });
  }

}
