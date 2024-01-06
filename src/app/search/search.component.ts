import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { PatientService } from './../shared/patient.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public apiService: ApiService, public patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    // this.apiService.searchForm.reset();
  }

  clickSearch(): void {
    // this.router.navigate(['/patient']);
    for (let i = 0; i < this.router.config.length; i++) {
      // const element = this.router.config[i];
      // console.log(element);
      if (this.router.config[i].path == 'patient-card') {

        this.patientService.getPatient(this.apiService.searchForm.value)

        console.log(this.apiService.searchForm.value);
      }
    }

  }
}
