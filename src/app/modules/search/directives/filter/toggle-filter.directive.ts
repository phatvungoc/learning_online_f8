import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleFilter]'
})
export class ToggleFilterDirective {
  isOff: boolean = true;
  constructor(private _el: ElementRef) { }
  @HostListener('click') toggleSectionFilter() {
    this.isOff = !this.isOff;
    const title = this._el.nativeElement.children[0];
    const chevron = this._el.nativeElement.children[1];
    const nestedList = this._el.nativeElement.nextElementSibling;
    if(this.isOff) {
      title.style.color = '#000';
      chevron.classList.remove('rotate-arrow');
      nestedList.style.display = 'none';
    }else {
      title.style.color = '#f26339';
      chevron.classList.add('rotate-arrow');
      nestedList.style.display = 'block';
    }  
  }
}
