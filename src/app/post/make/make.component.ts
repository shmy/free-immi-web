import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit, AfterViewInit {
  title = '';
  content = '';
  @ViewChild('titleInput', {static: true}) titleInput;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    }, 0);
  }

}
