import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ScrollLtrDirective } from './directives/scrollbar/scroll-ltr.directive';
import { ScrollRtlDirective } from './directives/scrollbar/scroll-rtl.directive';
import { ToggleSidebarDirective } from './directives/toggle-sidebar/toggle-sidebar.directive';
import { ToggleFilterDirective } from './directives/filter/toggle-filter.directive';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { FormsModule } from '@angular/forms';
import { HighlightPageDirective } from './directives/highlight-page/highlight-page.directive';



@NgModule({
  declarations: [
    SearchComponent,
    ToggleFilterDirective,
    ToggleSidebarDirective,
    ScrollLtrDirective,
    ScrollRtlDirective,
    HighlightPageDirective
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    SearchComponent
  ]
})
export class SearchModule { }
