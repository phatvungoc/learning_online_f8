import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { InstructorRoutingModule } from './instructor-routing.module';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { GeneralLayoutComponent } from './components/general-layout/general-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalCourseComponent } from './components/total-course/total-course.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HttpClientModule } from '@angular/common/http';
import { UpdateFormComponent } from './components/update-course/update-form.component';
import { UpdateCourseDetailComponent } from './components/update-course-detail/update-course-detail.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateCourseComponent,
    DashboardComponent,
    CreateCourseComponent,
    GeneralLayoutComponent,
    TotalCourseComponent,
    UpdateFormComponent,
    UpdateCourseDetailComponent,
    
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSlideToggleModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule
  ], 
})
export class InstructorModule { }
