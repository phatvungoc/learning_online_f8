import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';


@Directive({
  selector: '[appHighlightPage]'
})
export class HighlightPageDirective implements AfterViewInit, OnChanges{
  @Input() appHighlightPage: number;
  constructor(private _el: ElementRef) { 
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['appHighlightPage']){
      let pageNumber: number;
      if(this._el.nativeElement.innerText){
        pageNumber = JSON.parse(this._el.nativeElement.innerText);
      }
      
      if(pageNumber === this.appHighlightPage){
        console.log(this.appHighlightPage === pageNumber);
        this._el.nativeElement.classList.add('active-page');
      }else {
        this._el.nativeElement.classList.remove('active-page');
      }
      
    }
  }
  
  ngAfterViewInit(): void {
    const pageNumber = JSON.parse(this._el.nativeElement.innerText);
    if(pageNumber === this.appHighlightPage){
      this._el.nativeElement.classList.add('active-page');
    }else {
      this._el.nativeElement.classList.remove('active-page');
    }
  }

}
