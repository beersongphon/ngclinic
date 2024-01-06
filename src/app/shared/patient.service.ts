import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  tableList: any[] = [];

  constructor(private http: HttpClient) { }

  // //สร้าง function สำหรับเพิ่มข้อมูลผู้ใช้
  // insertUser(formValue: any): Observable<any>{
  //   const apiHeader = { 'Content-Type': 'application/json' };
  //   return this.http.post<any>(environment.apiUrl + '/api_insert_user_teacher.php', formValue, { headers: apiHeader });
  // }

  // //สร้าง function สำหรับแก่ไขข้อมูลผู้ใช้
  // updateUser(formValue: any): Observable<any>{
  //   const apiHeader = { 'Content-Type': 'application/json' };
  //   return this.http.post<any>(environment.apiUrl + '/api_edit_user.php', formValue, { headers: apiHeader });
  // }

  // //สร้าง function สำหรับลบข้อมูลผู้ใช้
  // deleteUser(formValue: any): Observable<any>{
  //   const apiHeader = { 'Content-Type': 'application/json' };
  //   return this.http.post<any>(environment.apiUrl + '/api_delete_user.php', formValue, { headers: apiHeader });
  // }

  // //สร้าง function สำหรับลบข้อมูลระดับผู้ใช้
  // getUserlevel(): Observable<Userlevel[]>{
  //   return this.http.get<Userlevel[]>(environment.apiUrl + '/api_get_userlevel.php');
  // }

  //สร้าง function สำหรับเรียกดูข้อมูลอาจารย์
  getPatient(formValue: any): void {
    const apiHeader = { 'Content-Type': 'application/json' };
    this.http.post<any>(environment.apiUrl + '/api_patient.php', formValue, { headers: apiHeader }).subscribe({
      next: (res) => {
        this.tableList = res;

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
  //สร้าง function สำหรับเพิ่มข้อมูลอาจารย์
  actionPatient(formValue: any) {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_patient.php', formValue, { headers: apiHeader });
    // return this.http.post<any>(environment.apiUrl + '/api_patient.php', formValue).subscribe((res: Response) => {
    //   this.getPatients();
    // });
  }
}
