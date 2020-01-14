import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-immi-cropper',
  templateUrl: './immi-cropper.component.html',
  styleUrls: ['./immi-cropper.component.scss']
})
export class ImmiCropperComponent implements OnInit, AfterViewInit {

  @ViewChild('imageElement', {static: true}) imageElement;
  cropper: any;
  base64 = '';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      dragMode: 'move',
      aspectRatio: 1,
    });
  }

  handleCropper() {
    if (this.cropper) {
      const data = this.cropper.getCroppedCanvas({width: 200, height: 200});
      const base64 = data.toDataURL({type: 'image/png'});
      this.base64 = base64;
    }
  }

  handleZoom(value: number) {
    if (this.cropper) {
      this.cropper.zoom(value);
    }
  }

  handleMove(x: number, y: number) {
    if (this.cropper) {
      this.cropper.move(x, y);
    }
  }
  handleReset() {
    if (this.cropper) {
      this.cropper.reset();
    }
  }

}
