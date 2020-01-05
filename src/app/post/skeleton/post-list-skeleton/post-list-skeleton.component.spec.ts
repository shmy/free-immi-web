import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListSkeletonComponent } from './post-list-skeleton.component';

describe('PostListSkeletonComponent', () => {
  let component: PostListSkeletonComponent;
  let fixture: ComponentFixture<PostListSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
