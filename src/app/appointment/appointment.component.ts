import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public startDateValue: any;
  public endDateValue: any;
  // public startDateValue: Date = new Date(2022, 5, 13);
  // public endDateValue: any = new Date(2022, 5, 17);
  public minDate: Date = new Date(2022, 5, 6);
  public maxDate: Date = new Date(2022, 6, 22);
  public minDayValue: Number = 5;
  public maxDayValue: Number = 10;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

}
