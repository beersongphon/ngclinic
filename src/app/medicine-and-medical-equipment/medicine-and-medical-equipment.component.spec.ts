import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineAndMedicalEquipmentComponent } from './medicine-and-medical-equipment.component';

describe('MedicineAndMedicalEquipmentComponent', () => {
  let component: MedicineAndMedicalEquipmentComponent;
  let fixture: ComponentFixture<MedicineAndMedicalEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineAndMedicalEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineAndMedicalEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
