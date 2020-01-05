import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  content = '';
  constructor() { }

  ngOnInit() {
  }
  handleClick(e) {
    e.target.classList.add('like-active');
  }
}
