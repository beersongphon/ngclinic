import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRemedyDetailComponent } from './report-remedy-detail.component';

describe('ReportRemedyDetailComponent', () => {
  let component: ReportRemedyDetailComponent;
  let fixture: ComponentFixture<ReportRemedyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRemedyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportRemedyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
