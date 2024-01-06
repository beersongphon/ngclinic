import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PatientService } from './../shared/patient.service';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-preliminary',
  templateUrl: './preliminary.component.html',
  styleUrls: ['./preliminary.component.css']
})
export class PreliminaryComponent implements OnInit {
  id: any;
  tableList: any[] = [];
  sub: Subscription = new Subscription;
  tableTime = [
    { id: '', name: '---เลือกระยะเวลา---' }
  ];

  preliminaryForm: FormGroup = this.formBuilder.group({
    preliminaryid: [{ value: '', disabled: true }, [Validators.required]],
    cardid: [{ value: '', disabled: true }, [Validators.required]],
    patientid: ['', [Validators.required]],
    firstname: [{ value: '', disabled: true }, [Validators.required]],
    lastname: [{ value: '', disabled: true }, [Validators.required]],
    birthday: [{ value: '', disabled: true }, [Validators.required]],
    address: [{ value: '', disabled: true }, [Validators.required]],
    tel: [{ value: '', disabled: true }, [Validators.required]],
    allergic: [{ value: '', disabled: true }, [Validators.required]],
    empid: ['', [Validators.required]],
    empname: [{ value: '', disabled: true }],
    preliminarycondition: ['', [Validators.required]],
    preliminarymemo: ['', [Validators.required]],
  });
  submitted = false;
  isDisable = true;
  patientid: any

  constructor(private patientService: PatientService, private apiService: ApiService, private datePipe: DatePipe, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.preliminaryForm.get('preliminaryid')?.setValue('PL_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    this.preliminaryForm.get('cardid')?.setValue(this.id);
    this.preliminaryForm.get('empid')?.setValue(localStorage.getItem('token'));
    console.log(this.preliminaryForm);
    console.log(this.preliminaryForm.controls['cardid'].value);

    this.getUser();
    this.getTime();
  }

  getTime(): void {
    let body = [{
      id: '09.00 น.',
      name: '09.00 น.'
    },{
      id: '10.00 น.',
      name: '10.00 น.'
    },{
      id: '11.00 น.',
      name: '11.00 น.'
    },{
      id: '13.00 น.',
      name: '13.00 น.'
    },{
      id: '14.00 น.',
      name: '14.00 น.'
    },{
      id: '15.00 น.',
      name: '15.00 น.'
    },{
      id: '16.00 น.',
      name: '16.00 น.'
    },{
      id: '17.00 น.',
      name: '17.00 น.'
    },{
      id: '18.00 น.',
      name: '18.00 น.'
    }];
    this.tableTime = this.tableTime.concat(body);
  }

  getUser(): void {
    this.patientService.actionPatient({ patientid: this.id }).subscribe({
      next: (res) => {
        console.log(res);
        this.preliminaryForm.get('patientid')?.setValue(res.data.Patient_ID);
        this.preliminaryForm.get('firstname')?.setValue(res.data.Firstname);
        this.preliminaryForm.get('lastname')?.setValue(res.data.Lastname);
        this.preliminaryForm.get('birthday')?.setValue(res.data.Birthday);
        this.preliminaryForm.get('address')?.setValue(res.data.Address);
        this.preliminaryForm.get('allergic')?.setValue(res.data.Allergic);
        this.preliminaryForm.get('tel')?.setValue(res.data.Tel);
        this.preliminaryForm.get('empname')?.setValue(res.data.Emp_Name);

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

  insertPreliminary(): void {
    let body = {
      myPreliminaryID: this.preliminaryForm.controls['preliminaryid'].value,
      myEmpID: localStorage.getItem('token'),
      myPatientID: this.preliminaryForm.controls['patientid'].value,
      myPreliminaryCondition: this.preliminaryForm.value.preliminarycondition,
      myPreliminaryMemo: this.preliminaryForm.value.preliminarymemo
    }
    console.log(body);
    this.apiService.actionPreliminary(body).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == "success") {
          Swal.fire({
            icon: "success",
            title: (res.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigate(['/patient']);
              this.preliminaryForm.reset();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: (res.message),
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
}
