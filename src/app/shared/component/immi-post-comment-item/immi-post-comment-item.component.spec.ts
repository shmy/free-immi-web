import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmiPostCommentItemComponent } from './immi-post-comment-item.component';

describe('ImmiPostCommentItemComponent', () => {
  let component: ImmiPostCommentItemComponent;
  let fixture: ComponentFixture<ImmiPostCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmiPostCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmiPostCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
