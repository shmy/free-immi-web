import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarCropperModalComponent } from './avatar-cropper-modal.component';

describe('AvatarCropperModalComponent', () => {
  let component: AvatarCropperModalComponent;
  let fixture: ComponentFixture<AvatarCropperModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarCropperModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarCropperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
