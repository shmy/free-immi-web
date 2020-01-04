import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmiBackTopComponent } from './immi-back-top.component';

describe('ImmiBackTopComponent', () => {
  let component: ImmiBackTopComponent;
  let fixture: ComponentFixture<ImmiBackTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmiBackTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmiBackTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
