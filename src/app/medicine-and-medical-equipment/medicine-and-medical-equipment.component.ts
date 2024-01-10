import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-medicine-and-medical-equipment',
  templateUrl: './medicine-and-medical-equipment.component.html',
  styleUrls: ['./medicine-and-medical-equipment.component.css']
})
export class MedicineAndMedicalEquipmentComponent implements OnInit {
  id: any;
  tableList: any[] = [];
  sub: Subscription = new Subscription;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  toSubmit: string = ""

  cardPatientForm: FormGroup = this.formBuilder.group({
    drugid: [{ value: '', disabled: true }, [Validators.required]],
    drugname: ['', [Validators.required]],
    mfgdate: ['', [Validators.required]],
    expdate: ['', [Validators.required]],
    relate: ['', [Validators.required]],
    notation: ['', [Validators.required]]
  });
  submitted = false;
  isDisable = true;
  patientid: any

  constructor(public apiService: ApiService, private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    console.log(this.cardPatientForm);
    this.cardPatientForm.get('drugid')?.setValue('DG_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
    this.getDrug();
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
      this.insertDrug(body);
      // this.router.navigate([`/patient-card`]); //after form submit page will redirect to users page
    }

  }

  //get all users  details
  getDrug(): void {
    this.apiService.getDrug(this.apiService.searchForm.value);
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

  insertDrug(formValue: any): void {
    this.sub = this.apiService.actionDrug(formValue).subscribe({
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
              this.router.navigate(['/medicine-and-medical-equipment']);
              this.cardPatientForm.reset();
              this.getDrug();
              this.cardPatientForm.get('drugid')?.setValue('DG_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
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
      myDrugName: this.cardPatientForm.value.drugname,
      myMfgDate: this.cardPatientForm.value.mfgdate,
      myExpDate: this.cardPatientForm.value.expdate,
      myRelate: this.cardPatientForm.value.relate,
      myNotation: this.cardPatientForm.value.notation
    };
    if (this.validateSubmit()) return;
    if (this.toSubmit == "new") {
      body = Object.assign(body, { myDrugID: this.cardPatientForm.controls['drugid'].value });
      this.insertDrug(body);
    } else if (this.toSubmit == "edit") {
      body = Object.assign(body, { updateid: this.cardPatientForm.controls['drugid'].value });
      this.updateDrug(body);
    }
  }

  updateDrug(formValue: any): void {
    this.sub = this.apiService.updateDrug(formValue).subscribe({
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
              this.router.navigate(['/medicine-and-medical-equipment']);
              this.cardPatientForm.reset();
              this.getDrug();
              this.cardPatientForm.get('drugid')?.setValue('DG_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
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
    // this.cardPatientForm.get('updateid')?.setValue(item.Drug_ID);
    this.cardPatientForm.get('drugid')?.setValue(item.Drug_ID);
    this.cardPatientForm.get('drugname')?.setValue(item.Drug_Name);
    this.cardPatientForm.get('mfgdate')?.setValue(item.Mfg_Date);
    this.cardPatientForm.get('expdate')?.setValue(item.Exp_Date);
    this.cardPatientForm.get('relate')?.setValue(item.Relate);
    this.cardPatientForm.get('notation')?.setValue(item.Notation);
  }

  clickDelete(item: any): void {
    let body = {
      deleteid: item.Drug_ID
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
        this.apiService.actionDrug(body).subscribe({
          next: (data) => {
            if (data.status == "success") {
              Swal.fire({
                icon: "success",
                title: (data.message),
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  this.router.navigate(['/medicine-and-medical-equipment']);
                  this.getDrug();
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
    this.cardPatientForm.get('drugid')?.setValue('DG_' + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss"));
  }

  validateSubmit(): boolean {
    if ((this.reformatDate(this.cardPatientForm.value.mfgdate) > this.reformatDate(this.cardPatientForm.value.expdate))
      || (Number(this.reformatDate(this.cardPatientForm.value.mfgdate, "year")) > 2500)
      || (Number(this.reformatDate(this.cardPatientForm.value.expdate, "year")) > 2500)) {
      Swal.fire({
        icon: "error",
        title: ('กรุณาระบุช่วงวันที่ให้ถูกต้อง'),
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
        if (result.isDismissed) {
          window.history.back;
        }
      });
      return true;
    }
    return false;
  }

  reformatDate(strdate: string, dateFormat?: any): any {
    let format = ''
    switch (dateFormat) {
      case 'body':
        format = 'yyyy-MM-dd'
        break;

      case 'exportFlie':
        format = 'dd/MM/yyyy'
        break;

      case 'year':
        format = 'yyyy'
        break;

      default:
        format = 'yyyyMMdd'
        break;
    }
    return this.datePipe.transform(strdate, format);
  }
}
