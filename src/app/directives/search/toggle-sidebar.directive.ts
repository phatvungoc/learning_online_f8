import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleSidebar]'
})
export class ToggleSidebarDirective {
  constructor() { }
  @HostListener('click') toggleSidebar() {
    const status = document.querySelector('.search__sidebar')?.getAttribute('style');
    const sidebar = document.querySelector('.search__sidebar');
    if(status === 'display: none;' || status === null) {
      sidebar?.setAttribute('style','display: block;');
      sidebar?.parentElement?.nextElementSibling?.classList.remove('col-lg-12');
      sidebar?.parentElement?.classList.remove('d-lg-none');
    } else {
      sidebar?.setAttribute('style','display: none;');
      sidebar?.parentElement?.classList.add('d-lg-none');
      sidebar?.parentElement?.nextElementSibling?.classList.add('col-lg-12');
    }
  }
}
