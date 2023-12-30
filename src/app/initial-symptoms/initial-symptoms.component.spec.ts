import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSymptomsComponent } from './initial-symptoms.component';

describe('InitialSymptomsComponent', () => {
  let component: InitialSymptomsComponent;
  let fixture: ComponentFixture<InitialSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSymptomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
