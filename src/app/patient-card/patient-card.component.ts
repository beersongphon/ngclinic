import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PatientService } from './../shared/patient.service';
import { Subscription } from 'rxjs';

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
    patientid: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    address: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    allergic: ['', [Validators.required]],
  });
  submitted = false;

  constructor(private datePipe: DatePipe, private patientService: PatientService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //Add User form validations
    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],

    //   firstname: ['', [Validators.required]]
    // });

    console.log(this.cardPatientForm.controls);
    console.log(this.cardPatientForm.controls['lastname'].status);
    this.cardPatientForm.get('patientid')?.setValue('PT_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    this.getPatients();
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

      myFormData.append('myPatientID', this.cardPatientForm.value.patientid);
      myFormData.append('myPatientName', this.cardPatientForm.value.firstname + ' ' + this.cardPatientForm.value.lastname);
      myFormData.append('myBirthday', this.cardPatientForm.value.birthday);
      myFormData.append('myAddress', this.cardPatientForm.value.address);
      myFormData.append('myTel', this.cardPatientForm.value.tel);
      myFormData.append('myAllergic', this.cardPatientForm.value.allergic);

      console.log(myFormData);
      console.log(this.cardPatientForm.value.firstname);
      console.log(this.cardPatientForm.value.lastname);
      console.log(this.cardPatientForm.value.birthday);
      console.log(this.cardPatientForm.value.address);
      console.log(this.cardPatientForm.value.tel);
      console.log(this.cardPatientForm.value.allergic);
      this.patientService.insertPatient(myFormData); //caaling add user service
      this.router.navigate([`/patient-card`]); //after form submit page will redirect to users page
    }

  }

  //get all users  details
  getPatients(): void {
    this.sub = this.patientService.getPatients().subscribe(
      (res) => {
        //นำข้อมูลที่ได้เก็บไว้ที่ตัวแปร getAdding
        this.tableList = res;
        console.log(res);
      }
    );
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
