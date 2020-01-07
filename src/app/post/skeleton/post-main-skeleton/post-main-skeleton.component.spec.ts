import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMainSkeletonComponent } from './post-main-skeleton.component';

describe('PostMainSkeletonComponent', () => {
  let component: PostMainSkeletonComponent;
  let fixture: ComponentFixture<PostMainSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMainSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMainSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
