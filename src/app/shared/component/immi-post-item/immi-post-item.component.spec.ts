import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmiPostItemComponent } from './immi-post-item.component';

describe('ImmiPostItemComponent', () => {
  let component: ImmiPostItemComponent;
  let fixture: ComponentFixture<ImmiPostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmiPostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmiPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
