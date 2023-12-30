import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPatientCardComponent } from './report-patient-card.component';

describe('ReportPatientCardComponent', () => {
  let component: ReportPatientCardComponent;
  let fixture: ComponentFixture<ReportPatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPatientCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
