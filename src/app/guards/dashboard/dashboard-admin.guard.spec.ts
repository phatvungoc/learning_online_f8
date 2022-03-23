import { TestBed } from '@angular/core/testing';

import { DashboardAdminGuard } from './dashboard-admin.guard';

describe('DashboardAdminGuard', () => {
  let guard: DashboardAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
