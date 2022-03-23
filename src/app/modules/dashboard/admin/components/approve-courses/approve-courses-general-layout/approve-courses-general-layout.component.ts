import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-approve-courses-general-layout',
  templateUrl: './approve-courses-general-layout.component.html',
  styleUrls: ['./approve-courses-general-layout.component.scss'],
})
export class ApproveCoursesGeneralLayoutComponent implements OnInit {
  @Output()
  returnHomeDashboard = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onReturnHomeDashboard() {
    this.returnHomeDashboard.emit();
  }
}
