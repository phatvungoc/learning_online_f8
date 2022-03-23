import { TestBed } from '@angular/core/testing';

import { LesstionListService } from './lesstion-list.service';

describe('LesstionListService', () => {
  let service: LesstionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LesstionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
