import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PatientService } from './../shared/patient.service';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: any;
  tableList: any[] = [];
  sub: Subscription = new Subscription;

  cardPatientForm: FormGroup = this.formBuilder.group({
    userid: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    address: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    department: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: new FormControl('', [Validators.minLength(5), Validators.required]),
  });
  submitted = false;
  isDisable = true;
  patientid: any

  constructor(public patientService: PatientService, public apiService: ApiService, private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    console.log(this.cardPatientForm);
    this.getUsers();
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
      // var myFormData = new FormData();

      // Begin assigning parameters
      // myFormData.append('myCardID', this.cardPatientForm.value.cardid);
      // myFormData.append('myPatientID', 'this.cardPatientForm.value.patientid');
      // myFormData.append('myPatientName', this.cardPatientForm.value.firstname + ' ' + this.cardPatientForm.value.lastname);
      // myFormData.append('myBirthday', this.cardPatientForm.value.birthday);
      // myFormData.append('myAddress', this.cardPatientForm.value.address);
      // myFormData.append('myTel', this.cardPatientForm.value.tel);
      // myFormData.append('myAllergic', this.cardPatientForm.value.allergic);
      // this.patientService.insertPatient(myFormData); //caaling add user service
      let body = {
        myUserID: this.cardPatientForm.value.userid,
        myUserName: this.cardPatientForm.value.firstname + ' ' + this.cardPatientForm.value.lastname,
        myAddress: this.cardPatientForm.value.address,
        myTel: this.cardPatientForm.value.tel,
        mySalary: this.cardPatientForm.value.salary,
        myDepartment: this.cardPatientForm.value.department,
        myUsername: this.cardPatientForm.value.username,
        myPassword: this.cardPatientForm.value.password
      }
      this.insertUser(body);
      // this.router.navigate([`/patient-card`]); //after form submit page will redirect to users page
    }

  }

  //get all users  details
  getUsers(): void {
    this.apiService.getUsers(this.apiService.searchForm.value);
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

  insertUser(formValue: any) {
    this.sub = this.apiService.actionUser(formValue).subscribe({
      next: (data) => {
        if (data.status == "success") {
          Swal.fire({
            icon: "success",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigate(['/user']);
              this.cardPatientForm.reset();
              this.getUsers();
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

  onItemSelect(item: any, action?: string) {
    if (item == 'แพทย์') {
      this.cardPatientForm.get('userid')?.setValue('DT_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));

    } else if (item == 'พนักงาน') {
      this.cardPatientForm.get('userid')?.setValue('EMP_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    }
    console.log(this.cardPatientForm);

    console.log(item);
  }

  clickSubmit() {

  }

  clickClear(): void {
    this.cardPatientForm.reset();
  }
}
