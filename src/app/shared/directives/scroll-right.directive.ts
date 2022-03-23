import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollRight]',
})
export class ScrollRightDirective {
  constructor(private _el: ElementRef) {}
  @HostListener('click') moveToRight() {
    const container = this._el.nativeElement.previousElementSibling;
    container.scrollLeft += 300;
  }
}
