import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-amortization',
  templateUrl: './amortization.component.html',
  styleUrls: ['./amortization.component.css']
})
export class AmortizationComponent implements OnInit {

  tableList: any[] = [];
  dispensary_id: any
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tableList = [{
      dispensary_id: 1,
      treatment_id: 1,
      patient_card_id: 1,
      patient_name: "สมชาย ทดสอบ",
      service_fee: 1000,
      transaction_maker: "ทดสอบ มีหรอ",
      transaction_time: "18-5-2023 10.23"
    },{
      dispensary_id: 1,
      treatment_id: 1,
      patient_card_id: 1,
      patient_name: "สมชาย ทดสอบ",
      service_fee: 1000,
      transaction_maker: "ทดสอบ มีหรอ",
      transaction_time: "18-5-2023 10.23"
    }]
  }

  selectRow(index:any,value:any){
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ต้องการไปหน้าชำระเงิน ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/checkout', value]);
      }
    });
    // this.dispensary_id = value
    // this.highlightRow(index)

  }

  highlightRow(index:any){
    let document: any

    let tr = document.getElementsByName("trRow")
    for (let i = 0; i < tr.length; i++) {
      document.getElementById('TR_ROW_'+i).style.backgroundColor = "white";

    }
    if(index >= 0){
      document.getElementById('TR_ROW_'+index).style.backgroundColor = "rgba(0, 0, 0, .075)";
    }

  }

  clickSelect(){
    // if(this.dispensary_id){
    //   this.toSent = [{dispensary_id : this.dispensary_id}];
    //   this.closeModal.nativeElement.click();
    // }
  }
}
