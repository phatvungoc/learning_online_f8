import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBadgeComponent } from './purchase-badge.component';

describe('PurchaseBadgeComponent', () => {
  let component: PurchaseBadgeComponent;
  let fixture: ComponentFixture<PurchaseBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
