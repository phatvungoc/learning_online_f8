import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollLeftDirective } from './directives/scroll-left.directive';
import { ScrollRightDirective } from './directives/scroll-right.directive';
import { ToggleAltSidebarDirective } from './directives/toggle-alt-sidebar/toggle-alt-sidebar.directive';
import { ToggleSearchInputDirective } from './directives/toggle-search-input/toggle-search-input.directive';
import { CourseService } from '../services/course/course.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ScrollLeftDirective,
    ScrollRightDirective,
    ToggleAltSidebarDirective,
    ToggleSearchInputDirective,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ScrollLeftDirective,
    ScrollRightDirective,
  ],
  providers:[CourseService]
})
export class SharedModule {}
