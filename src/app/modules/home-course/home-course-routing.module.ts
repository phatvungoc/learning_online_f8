import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCourseComponent } from './home-course.component';
const routes: Routes = [{ path: '', component: HomeCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCourseRoutingModule {}
