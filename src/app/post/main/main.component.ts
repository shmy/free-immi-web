import {Component, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {LoadStatus} from "../../shared/enum/load-status.enum";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private postService: PostService) {
  }
  loadStatus: LoadStatus = new LoadStatus();
  items: any = [];

  ngOnInit() {
    this.handleFetch();
  }

  async handleFetch() {
    if (this.loadStatus.isLoading) {
      return;
    }
    this.loadStatus.setLoading();
    const data = await this.postService.getPostPlateList();
    this.loadStatus.setLoaded();
    this.items = data;
  }

}
