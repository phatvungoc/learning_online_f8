import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsActivitiesComponent } from './events-activities.component';

describe('EventsActivitiesComponent', () => {
  let component: EventsActivitiesComponent;
  let fixture: ComponentFixture<EventsActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
