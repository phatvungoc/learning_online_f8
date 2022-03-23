import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralLayoutComponent } from './components/general-layout/general-layout.component';

const routes: Routes = [{ path: ':hashCode', component: GeneralLayoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningRoutingModule {}
