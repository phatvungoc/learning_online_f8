import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appBackbutton]',
})
export class BackbuttonDirective {
  constructor(private location: Location) {}
  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
