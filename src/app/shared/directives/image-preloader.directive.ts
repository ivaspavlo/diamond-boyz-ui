import { ChangeDetectorRef, Directive, Input, OnInit } from '@angular/core';


@Directive({
  selector: '[img-preloader]',
  host: { '[attr.src]': 'finalImage' }
})
export class ImagePreloader implements OnInit {

  @Input('img-preloader') targetSource: string | null;
  @Input() defaultImage = '/assets/img/placeholder.png';

  public downloadingImage: any;
  public finalImage: string;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.preloadImg();
  }

  private preloadImg(): void {
    this.finalImage = this.defaultImage;

    if (this.targetSource !== null) {
      this.downloadingImage = new Image();
      this.downloadingImage.onload = () => {
        // @ts-ignore
        this.finalImage = this.targetSource;
        this.cdr.detectChanges();
      }
      this.downloadingImage.src = this.targetSource;
    }
  }

}
