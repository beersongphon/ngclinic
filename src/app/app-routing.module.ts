import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { PatientComponent } from './patient/patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PreliminaryComponent } from './preliminary/preliminary.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PaymentComponent } from './payment/payment.component';
import { RemedyComponent } from './remedy/remedy.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { MedicineAndMedicalEquipmentComponent } from './medicine-and-medical-equipment/medicine-and-medical-equipment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { AmortizationComponent } from './amortization/amortization.component';
import { DealerComponent } from './dealer/dealer.component';
import { ProductWriteOffComponent } from './product-write-off/product-write-off.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { DiseaseComponent } from './disease/disease.component';
import { ReportRemedyComponent } from './report-remedy/report-remedy.component';
import { ReportAppointmentComponent } from './report-appointment/report-appointment.component';
import { ReportPatientCardComponent } from './report-patient-card/report-patient-card.component';
import { ReportRemedyDetailComponent } from './report-remedy-detail/report-remedy-detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'patient-card', component: PatientCardComponent, canActivate: [AuthGuard] },
  { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'edit-patient', component: EditPatientComponent, canActivate: [AuthGuard] },
  { path: 'preliminary', component: PreliminaryComponent, canActivate: [AuthGuard] },
  { path: 'remedy', component: RemedyComponent, canActivate: [AuthGuard] },
  { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'symptoms', component: SymptomsComponent, canActivate: [AuthGuard] },
  { path: 'add-appointment', component: AddAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'medicine-and-medical-equipment', component: MedicineAndMedicalEquipmentComponent, canActivate: [AuthGuard] },
  { path: 'amortization', component: AmortizationComponent, canActivate: [AuthGuard] },
  { path: 'dealer', component: DealerComponent, canActivate: [AuthGuard] },
  { path: 'product-write-off', component: ProductWriteOffComponent, canActivate: [AuthGuard] },
  { path: 'disease', component: DiseaseComponent, canActivate: [AuthGuard] },
  { path: 'report-remedy', component: ReportRemedyComponent, canActivate: [AuthGuard] },
  { path: 'report-remedys', component: ReportRemedyDetailComponent, canActivate: [AuthGuard] },
  { path: 'report-appointment', component: ReportAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'report-patient-card', component: ReportPatientCardComponent, canActivate: [AuthGuard] },
  // { path: 'register', component: RegisterComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
