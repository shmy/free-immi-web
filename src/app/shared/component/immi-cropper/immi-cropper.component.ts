import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-immi-cropper',
  templateUrl: './immi-cropper.component.html',
  styleUrls: ['./immi-cropper.component.scss']
})
export class ImmiCropperComponent implements OnInit, AfterViewInit {

  @ViewChild('imageElement', {static: true}) imageElement;
  cropper: any;
  @Output('cropped') croppedEmitter = new EventEmitter<string>();
  @Input('imageUrl') imageUrl = '';
  @Input('width') width = 200;
  @Input('height') height = 200;
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
      const data = this.cropper.getCroppedCanvas({width: this.width, height: this.height});
      const dataURL = data.toDataURL('image/png');
      this.croppedEmitter.emit(dataURL);
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
