import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleAltSidebar]'
})
export class ToggleAltSidebarDirective {

  isOff: boolean = true;
  
  constructor(private _el: ElementRef) { }
  @HostListener('click') toggleAltSidebar() {
    this.isOff = !this.isOff;
    const altSidebarContainer = this._el.nativeElement.nextElementSibling
    const altSidebar = altSidebarContainer.children[0];
    if(this.isOff) {
      altSidebarContainer.classList.remove('alt-sidebar-container');
      altSidebar.classList.remove('alt-sidebar');
    }else {
      altSidebarContainer.classList.add('alt-sidebar-container');
      altSidebar.classList.add('alt-sidebar');
    }
  }

}
