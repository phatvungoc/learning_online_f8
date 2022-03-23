import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminGuard } from 'src/app/guards/dashboard/dashboard-admin.guard';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [DashboardAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
