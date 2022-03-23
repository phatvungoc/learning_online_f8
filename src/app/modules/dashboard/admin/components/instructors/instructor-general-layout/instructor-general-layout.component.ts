import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-instructor-general-layout',
  templateUrl: './instructor-general-layout.component.html',
  styleUrls: ['./instructor-general-layout.component.scss'],
})
export class InstructorGeneralLayoutComponent implements OnInit {
  @Output()
  returnHomeDashboard = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onReturnHomeDashboard() {
    this.returnHomeDashboard.emit();
  }
}
