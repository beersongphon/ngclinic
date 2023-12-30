import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAppointmentComponent } from './report-appointment.component';

describe('ReportAppointmentComponent', () => {
  let component: ReportAppointmentComponent;
  let fixture: ComponentFixture<ReportAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
