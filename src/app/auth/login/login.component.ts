import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('usernameInput', {static: true}) usernameInput;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  handleSubmit(e) {
    e.preventDefault();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.usernameInput.nativeElement.focus();
    }, 0);
  }
}
