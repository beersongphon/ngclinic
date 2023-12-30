import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRemedyComponent } from './report-remedy.component';

describe('ReportRemedyComponent', () => {
  let component: ReportRemedyComponent;
  let fixture: ComponentFixture<ReportRemedyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRemedyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportRemedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
