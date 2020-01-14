import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmiCropperComponent } from './immi-cropper.component';

describe('ImmiCropperComponent', () => {
  let component: ImmiCropperComponent;
  let fixture: ComponentFixture<ImmiCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmiCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmiCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
