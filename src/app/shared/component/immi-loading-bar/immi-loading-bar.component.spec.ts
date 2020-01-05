import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmiLoadingBarComponent } from './immi-loading-bar.component';

describe('ImmiLoadingBarComponent', () => {
  let component: ImmiLoadingBarComponent;
  let fixture: ComponentFixture<ImmiLoadingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmiLoadingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmiLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
