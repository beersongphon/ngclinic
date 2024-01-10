import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2';

export interface Users {
  User_ID: number;
  User_Name: string;
  Email: string;
  Password: string;
  Userlevel_ID: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  redirectUrl: string | undefined;
  searchForm: FormGroup = this.fb.group({
    txtSearch: ['']
  });
  tableList: any[] = [];
  //registerUrl: string = "http://localhost/api/register.php";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  //สร้าง function สำหรับเข้าสู่ระบบ
  login(loginForm: any): Observable<any> {
    const loginHeader = { 'Content-Type': 'application/json' };
    const body = {
      'username': loginForm.username,
      'password': loginForm.password
    };
    return this.http.post<any>(environment.apiUrl + '/api_login.php', body, { headers: loginHeader }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  userlogin(loginForm: any): Observable<any> {
    const loginHeader = { 'Content-Type': 'application/json' };
    const body = {
      'username': loginForm.username,
      'password': loginForm.password
    };
    return this.http.post<any>(environment.apiUrl + '/api_login_2.php', body, { headers: loginHeader }).pipe(
      map(
        (Users) => {
          this.setToken(Users[0].User_ID, Users[0].Userlevel_ID);
          this.getLoggedInName.emit(true);
          return Users;
        }
      )
    );
  }

  private handleError(error: HttpErrorResponse): any {
    // return throwError(error);
    return throwError(() => error);
  }

  getPatient(formValue: any): Observable<any[]>{
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_patient.php', formValue, { headers: apiHeader });
  }

  actionPreliminary(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_preliminary.php', formValue, { headers: apiHeader });
  }

  actionDealer(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_dealer.php', formValue, { headers: apiHeader });
  }

  updateDealer(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_dealer.php', formValue, { headers: apiHeader });
  }

  deleteDealer(formValue: any): Observable<any>{
    const apiHeader = { 'Content-Type': 'application/json' };
    // const p = {
    //   'id': id.toString()
    // };
    return this.http.delete<any>(environment.apiUrl + '/api_dealer.php', { params: formValue });
  }

  getDealer(formValue: any): void {
    const apiHeader = { 'Content-Type': 'application/json' };
    this.http.post<any>(environment.apiUrl + '/api_dealer.php', formValue, { headers: apiHeader }).subscribe({
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

  actionDisease(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_disease.php', formValue, { headers: apiHeader });
  }

  updateDisease(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_disease.php', formValue, { headers: apiHeader });
  }

  getDisease(formValue: any): void {
    const apiHeader = { 'Content-Type': 'application/json' };
    this.http.post<any>(environment.apiUrl + '/api_disease.php', formValue, { headers: apiHeader }).subscribe({
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

  actionDrug(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_drug.php', formValue, { headers: apiHeader });
  }

  updateDrug(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_drug.php', formValue, { headers: apiHeader });
  }

  getDrug(formValue: any): void {
    const apiHeader = { 'Content-Type': 'application/json' };
    this.http.post<any>(environment.apiUrl + '/api_drug.php', formValue, { headers: apiHeader }).subscribe({
      next: (res) => {
        this.tableList = res;
        this.tableList = this.tableList.map((item) => ({
          ...item,
          Date: item.Mfg_Date +' / '+ item.Exp_Date,
        }));
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

  actionUser(formValue: any){
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_user.php', formValue, { headers: apiHeader });
  }

  getUsers(formValue: any): void {
    const apiHeader = { 'Content-Type': 'application/json' };
    this.http.post<any>(environment.apiUrl + '/api_user.php', formValue, { headers: apiHeader }).subscribe({
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

  getUser(): Observable<any> {
    const apiHeader = { 'Authorization': '' + this.getToken() };
    return this.http.get<any>(environment.apiUrl + '/api_show_user.php', { headers: apiHeader });
  }

  //token
  setToken(token: string, Userlevel_ID: string) {
    // localStorage.setItem('token', JSON.stringify(token));
    // localStorage.setItem('userlevel_id', JSON.stringify(Userlevel_ID));
    localStorage.setItem('token', token);
    localStorage.setItem('userlevel_id', Userlevel_ID);
  }

  //รับค่า token
  getToken() {
    return localStorage.getItem('token');
    // return JSON.parse(localStorage.getItem('data') || '{}');
  }

  //ลบค่า token
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userlevel_id');
  }

  //รับค่า Userlevel
  getUserlevel() {
    return localStorage.getItem('userlevel_id');
  }

  //เช็ค token
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token != null) {
      return true
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
  }
}
