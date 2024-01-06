import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPatientCardComponent } from './print-patient-card.component';

describe('PrintPatientCardComponent', () => {
  let component: PrintPatientCardComponent;
  let fixture: ComponentFixture<PrintPatientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPatientCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
