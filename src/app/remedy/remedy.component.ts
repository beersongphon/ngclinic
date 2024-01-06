import { Component, OnInit } from '@angular/core';
import { ApiService } from './../shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remedy',
  templateUrl: './remedy.component.html',
  styleUrls: ['./remedy.component.css']
})
export class RemedyComponent implements OnInit {

  tableList: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPreliminary();
  }

  getPreliminary(): void {
    this.apiService.actionPreliminary({ txtSearch: '' }).subscribe({
      next: (res) => {
        this.tableList = res;
        console.log(this.tableList);

        // this.cardPatientForm.get('empid')?.setValue(res.User_ID);
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }

}
