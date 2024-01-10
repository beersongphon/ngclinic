import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { PatientService } from './../shared/patient.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public apiService: ApiService, public patientService: PatientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.apiService.searchForm.reset();
  }

  clickSearch(): void {
    if (this.route.snapshot.routeConfig?.path == 'patient-card') {
      this.patientService.getPatient(this.apiService.searchForm.value)
    } else if (this.route.snapshot.routeConfig?.path == 'user') {
      this.apiService.getUsers(this.apiService.searchForm.value)
    } else if (this.route.snapshot.routeConfig?.path == 'dealer') {
      this.apiService.getDealer(this.apiService.searchForm.value)
    } else if (this.route.snapshot.routeConfig?.path == 'disease') {
      this.apiService.getDisease(this.apiService.searchForm.value)
    } else if (this.route.snapshot.routeConfig?.path == 'medicine-and-medical-equipment') {
      this.apiService.getDrug(this.apiService.searchForm.value)
    }
  }
}
