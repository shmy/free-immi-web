import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit {
  title = '';
  content = '';
  constructor() { }

  ngOnInit() {
  }

}
