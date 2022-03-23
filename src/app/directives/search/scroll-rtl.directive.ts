import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollRtl]'
})
export class ScrollRtlDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('click') moveToLeft() {
    const container = this._el.nativeElement.parentElement.nextElementSibling;
    container.scrollLeft -= 300;
  }
}
