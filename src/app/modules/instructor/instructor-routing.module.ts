import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCourseComponent } from "./components/create-course/create-course.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GeneralLayoutComponent } from "./components/general-layout/general-layout.component";
import { TotalCourseComponent } from "./components/total-course/total-course.component";
import { UpdateCourseDetailComponent } from "./components/update-course-detail/update-course-detail.component";

const routes: Routes = [
  {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'create-course',
        component: CreateCourseComponent
      },
      {
        path: 'total-courses',
        component: TotalCourseComponent
      },
      { 
        path: 'update-course-detail',
        component: UpdateCourseDetailComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InstructorRoutingModule {}