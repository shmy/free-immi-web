import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmiHeaderComponent } from './immi-header.component';

describe('ImmiHeaderComponent', () => {
  let component: ImmiHeaderComponent;
  let fixture: ComponentFixture<ImmiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmiHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
