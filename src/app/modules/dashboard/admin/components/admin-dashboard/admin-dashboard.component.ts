import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { IAdminDashboard } from '../../models';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  adminDashboard!: IAdminDashboard;
  showedContent = 'general';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getAdminDashboard().subscribe({
      next: (data) => {
        this.adminDashboard = data;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  onShowStudents() {
    this.showedContent = 'students';
  }

  onShowInstructors() {
    this.showedContent = 'instructors';
  }

  onShowCourses() {
    this.showedContent = 'courses';
  }

  onShowApproveCourses() {
    this.showedContent = 'approveCourses';
  }

  onReturn() {
    this.showedContent = 'general';
  }
}
