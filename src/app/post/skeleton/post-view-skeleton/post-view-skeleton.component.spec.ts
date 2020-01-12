import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewSkeletonComponent } from './post-view-skeleton.component';

describe('PostViewSkeletonComponent', () => {
  let component: PostViewSkeletonComponent;
  let fixture: ComponentFixture<PostViewSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostViewSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
