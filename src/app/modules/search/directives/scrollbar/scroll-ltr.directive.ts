import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollLtr]'
})
export class ScrollLtrDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('click') moveToRight() {
    const container = this._el.nativeElement.parentElement.nextElementSibling;
    container.scrollLeft += 300;
  }
}
