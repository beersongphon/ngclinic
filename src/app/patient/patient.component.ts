import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from './../shared/patient.service';
import { ApiService } from './../shared/api.service';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  tableList: any[] = [];
  sub: Subscription = new Subscription;
  sentToPrint: Subject<object> = new Subject<object>();

  constructor(public apiService: ApiService, public patientService: PatientService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getPatient()
  }

  //get all users  details
  getPatient(): void {
    this.patientService.getPatient(this.apiService.searchForm.value);
  }

  clickPrint(nums: any) {
    let listToPrints: any;
    listToPrints = JSON.parse(JSON.stringify(this.tableList[nums]));
    if (listToPrints.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุรายการที่ต้องการพิมพ์',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isDismissed) {
          window.history.back;
        }
      });
    } else {
      this.sentToPrint.next(listToPrints);
    }
  }

  actionAddUpdateDelete(action: any, obj: any): void {
    obj.action = action;
    if (action === 'Add') {
      // this.addRowData(result.data);
    } else if (action === 'Update') {
      // this.router.navigate(['/preliminary', obj.Card_ID]);
      // this.updateRowData(result.data);
    } else if (action === 'Delete') {

      this.deleteRowData(obj.Patient_ID);
    }
  }


  deleteRowData(id: any) {
    let body = {}
    body = {
      deleteid: id,
    }
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถเปลี่ยนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.value) {
        this.patientService.actionPatient(body).subscribe({
          next: (data) => {
            if (data.status == "success") {
              Swal.fire({
                icon: "success",
                title: (data.message),
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  // this.router.navigate(['/preliminary']);
                  this.getPatient();
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: (data.message),
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  window.history.back;
                }
              });
            }
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
    })
  }
}
