import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

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
  getPatients(): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl + '/patient.php');
  }

  //สร้าง function สำหรับเรียกดูข้อมูลอาจารย์ทั้งหมด
  getPatient(formValue: any): Observable<any[]>{
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/patient.php', formValue, { headers: apiHeader });
  }

  //สร้าง function สำหรับเพิ่มข้อมูลอาจารย์
  insertPatient(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    // return this.http.post<any>(environment.apiUrl + '/patient.php', formValue, { headers: apiHeader });
    return this.http.post<any>(environment.apiUrl + '/patient.php', formValue).subscribe((res: Response) => {
      this.getPatients();
    });
  }

  //สร้าง function สำหรับแก้ไขข้อมูลอาจารย์
  updateTeacher(formValue: any): Observable<any>{
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_edit_teacher.php', formValue, { headers: apiHeader });
  }

  //สร้าง function สำหรับลบข้อมูลอาจารย์
  deleteTeacher(formValue: any): Observable<any>{
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_delete_teacher.php', formValue, { headers: apiHeader });
  }
}
