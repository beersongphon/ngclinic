import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MatRippleModule, MatLineModule } from '@angular/material/core';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { PatientComponent } from './patient/patient.component';
import { PreliminaryComponent } from './preliminary/preliminary.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PaymentComponent } from './payment/payment.component';
import { RemedyComponent } from './remedy/remedy.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ReportRemedyComponent } from './report-remedy/report-remedy.component';
import { ReportAppointmentComponent } from './report-appointment/report-appointment.component';
import { ReportPatientCardComponent } from './report-patient-card/report-patient-card.component';
import { InitialSymptomsComponent } from './initial-symptoms/initial-symptoms.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { MedicineAndMedicalEquipmentComponent } from './medicine-and-medical-equipment/medicine-and-medical-equipment.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { AmortizationComponent } from './amortization/amortization.component';
import { DealerComponent } from './dealer/dealer.component';
import { ProductWriteOffComponent } from './product-write-off/product-write-off.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { UserComponent } from './user/user.component';
import { ReportRemedyDetailComponent } from './report-remedy-detail/report-remedy-detail.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { DiseaseComponent } from './disease/disease.component';
import { PrintPatientCardComponent } from './patient/print-patient-card/print-patient-card.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    PatientCardComponent,
    SidebarComponent,
    PatientComponent,
    PreliminaryComponent,
    AppointmentComponent,
    PaymentComponent,
    RemedyComponent,
    PagenotfoundComponent,
    ReportRemedyComponent,
    ReportAppointmentComponent,
    ReportPatientCardComponent,
    InitialSymptomsComponent,
    CheckoutComponent,
    SymptomsComponent,
    MedicineAndMedicalEquipmentComponent,
    AddAppointmentComponent,
    EditPatientComponent,
    AmortizationComponent,
    DealerComponent,
    OrderComponent,
    OrdersComponent,
    UserComponent,
    ReportRemedyDetailComponent,
    InvoiceComponent,
    ProductWriteOffComponent,
    TreatmentComponent,
    DiseaseComponent,
    PrintPatientCardComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CurrencyPipe,
    DatePipe,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatRippleModule,
    MatLineModule,
    DateRangePickerModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
