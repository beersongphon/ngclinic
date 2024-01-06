import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PatientService } from './../shared/patient.service';
import { ApiService } from './../shared/api.service';
@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css']
})
export class PatientCardComponent implements OnInit {
  id: any;
  tableList: any[] = [];
  sub: Subscription = new Subscription;

  cardPatientForm: FormGroup = this.formBuilder.group({
    cardid: ['', [Validators.required]],
    patientid: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    address: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    allergic: ['', [Validators.required]],
    empid: ['', [Validators.required]],
  });
  submitted = false;
  isDisable = true;
  patientid: any

  constructor(public patientService: PatientService, private apiService: ApiService, private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    console.log(this.cardPatientForm);

    //Add User form validations
    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],

    //   firstname: ['', [Validators.required]]
    // });
    this.cardPatientForm.get('cardid')?.setValue('CD_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    this.cardPatientForm.get('patientid')?.setValue('PT_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    this.cardPatientForm.get('empid')?.setValue(localStorage.getItem('token'));
    this.getPatient();
    this.getUser();
  }

clicSubmit(){
  this.cardPatientForm.disable();
}
  //Add user form actions
  get f() {
    console.log(this.cardPatientForm.controls);

    return this.cardPatientForm.controls;
  }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.cardPatientForm.invalid) {
      return;
    }
    console.log(this.submitted);

    //True if all the fields are filled
    if (this.submitted) {

      // Initialize Params Object
      var myFormData = new FormData();

      // Begin assigning parameters

      // myFormData.append('myCardID', this.cardPatientForm.value.cardid);
      // myFormData.append('myPatientID', 'this.cardPatientForm.value.patientid');
      // myFormData.append('myPatientName', this.cardPatientForm.value.firstname + ' ' + this.cardPatientForm.value.lastname);
      // myFormData.append('myBirthday', this.cardPatientForm.value.birthday);
      // myFormData.append('myAddress', this.cardPatientForm.value.address);
      // myFormData.append('myTel', this.cardPatientForm.value.tel);
      // myFormData.append('myAllergic', this.cardPatientForm.value.allergic);

      console.log(myFormData);
      console.log(this.cardPatientForm.value.patientid);
      console.log(this.cardPatientForm.value.firstname);
      console.log(this.cardPatientForm.value.lastname);
      console.log(this.cardPatientForm.value.birthday);
      console.log(this.cardPatientForm.value.address);
      console.log(this.cardPatientForm.value.tel);
      console.log(this.cardPatientForm.value.allergic);
      // this.patientService.insertPatient(myFormData); //caaling add user service
      let body = {
        myCardID: this.cardPatientForm.value.cardid,
        myPatientID: this.cardPatientForm.value.patientid,
        myPatientName: this.cardPatientForm.value.firstname + ' ' + this.cardPatientForm.value.lastname,
        myBirthday: this.cardPatientForm.value.birthday,
        myAddress: this.cardPatientForm.value.address,
        myTel: this.cardPatientForm.value.tel,
        myAllergic: this.cardPatientForm.value.allergic,
        myEmpID: localStorage.getItem('token')
      }
      this.insertPatient(body);
      this.router.navigate([`/patient-card`]); //after form submit page will redirect to users page
    }

  }

  //get all users  details
  getPatient(): void {
    this.patientService.getPatient(this.apiService.searchForm.value);
    // this.sub = this.patientService.actionPatient(this.apiService.searchForm.value).subscribe(
    //   (res) => {
    //     //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร getPatients
    //     this.tableList = res;
    //     console.log(res);
    //   }
    // );
  }

  getUser(): void {
    this.apiService.getUser().subscribe({
      next: (res) => {
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

  insertPatient(formValue: any) {
    this.sub = this.patientService.actionPatient(formValue).subscribe({
      next: (data) => {
        if (data.status == "success") {
          Swal.fire({
            icon: "success",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigate(['/patient-card']);
              this.cardPatientForm.reset();
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

  //add new user
  // public adduser(userData) {
  //   return this.http.post('http://localhost/users.php/'
  //     , userData).subscribe((res: Response) => {
  //       this.getusers();
  //     });
  // }

  clickSubmit() {
    // let pa = {
    //   Patient_ID: 'PT_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"),
    //   Patient_Name: '',
    //   Birthday: '',
    //   Address: '',
    //   Tel: '',
    //   Allergic: '',
    // }
    // this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss")
  }

}
