import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollLeft]',
})
export class ScrollLeftDirective {
  constructor(private _el: ElementRef) {}
  @HostListener('click') moveToLeft() {
    const container = this._el.nativeElement.nextElementSibling;
    container.scrollLeft -= 300;
  }
}
