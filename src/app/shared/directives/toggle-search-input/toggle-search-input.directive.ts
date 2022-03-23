import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleSearchInput]'
})
export class ToggleSearchInputDirective {

  isOff: boolean = true;
  constructor(private _el: ElementRef) { }
  @HostListener('click') toggleInput(){
    this.isOff = !this.isOff;
    const searchContainer = document.querySelector('.header__search');
    
    if(this.isOff) {
      searchContainer.classList.remove('alt-search-container');
    }else {
      searchContainer.classList.add('alt-search-container');
    }
  }

}
