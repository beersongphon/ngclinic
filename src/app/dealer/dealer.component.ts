import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  id: any;
  tableList: any[] = [];
  sub: Subscription = new Subscription;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  toSubmit: string = ""

  cardPatientForm: FormGroup = this.formBuilder.group({
    dealerid: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.pattern(this.emailPattern), Validators.required]],
    address: ['', [Validators.required]],
    tel: ['', [Validators.required]]
  });
  submitted = false;
  isDisable = true;
  patientid: any

  constructor(public apiService: ApiService, private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    console.log(this.cardPatientForm);
    this.cardPatientForm.get('dealerid')?.setValue('DL_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    this.getDealer();
    this.getUser();
    this.toSubmit = "new";
  }

  clicSubmit(): void {
    this.cardPatientForm.disable();
  }
  //Add user form actions
  get f() {
    console.log(this.cardPatientForm.controls);

    return this.cardPatientForm.controls;
  }
  onSubmit(): void {

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
      this.insertDealer(body);
      // this.router.navigate([`/patient-card`]); //after form submit page will redirect to users page
    }

  }

  //get all users  details
  getDealer(): void {
    this.apiService.getDealer(this.apiService.searchForm.value);
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

  insertDealer(formValue: any): void {
    this.sub = this.apiService.actionDealer(formValue).subscribe({
      next: (res) => {
        if (res.status == "success") {
          Swal.fire({
            icon: "success",
            title: (res.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.toSubmit = "new";
              this.router.navigate(['/dealer']);
              this.cardPatientForm.reset();
              this.getDealer();
              this.cardPatientForm.get('dealerid')?.setValue('DL_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
            }
          });
        } else {
          console.log(res.message);
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
        console.log(error);
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

  clickSubmit(): void {
    let body = {
      myDealername: this.cardPatientForm.value.firstname + ' ' + this.cardPatientForm.value.lastname,
      myAddress: this.cardPatientForm.value.address,
      myEmail: this.cardPatientForm.value.email,
      myTel: this.cardPatientForm.value.tel
    }

    if (this.toSubmit == "new") {
      body = Object.assign(body, { myDealerID: this.cardPatientForm.value.dealerid });
      console.log(this.toSubmit);
      this.insertDealer(body);
    } else if (this.toSubmit == "edit") {
      body = Object.assign(body, { updateid: this.cardPatientForm.value.dealerid });
      console.log(this.toSubmit);
      this.updateDealer(body);
    }
  }

  updateDealer(formValue: any): void {
    this.sub = this.apiService.updateDealer(formValue).subscribe({
      next: (res) => {
        if (res.status == "success") {
          Swal.fire({
            icon: "success",
            title: (res.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.toSubmit = "new";
              this.router.navigate(['/dealer']);
              this.cardPatientForm.reset();
              this.getDealer();
            }
          });
        } else {
          console.log(res.message);
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
        console.log(error);
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

  clickUpdate(item: any): void {
    this.toSubmit = "edit";
    // this.cardPatientForm.get('updateid')?.setValue(item.Dealer_ID);
    this.cardPatientForm.get('dealerid')?.setValue(item.Dealer_ID);
    this.cardPatientForm.get('firstname')?.setValue(item.Firstname);
    this.cardPatientForm.get('lastname')?.setValue(item.Lastname);
    this.cardPatientForm.get('email')?.setValue(item.Email);
    this.cardPatientForm.get('address')?.setValue(item.Address);
    this.cardPatientForm.get('tel')?.setValue(item.Tel);
  }

  clickDelete(item: any): void {
    let body = {
      deleteid: item.Dealer_ID
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
        this.apiService.deleteDealer(body).subscribe({
          next: (data) => {
            if (data.status == "success") {
              Swal.fire({
                icon: "success",
                title: (data.message),
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  this.router.navigate(['/dealer']);
                  this.getDealer();
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
            console.log(error);
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
    });
  }

  clickClear(): void {
    this.cardPatientForm.reset();
  }
}
