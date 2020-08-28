import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService) {
  
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null)
    {
      form.resetForm();
    }
    
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    };
  }

  onSubmit(form: NgForm){
    if(this.service.formData.PMId=0){
      this.insert(form);
    }
    else{
      this.update(form);
    }
   
  }

  insert(form: NgForm){
    this.service.postPaymentDetail().subscribe(
      res => { this.resetForm(form);
      this.toastr.success('Submitted successfully','Payment Detail Register');
      this.service.getPaymentDetailList();
      },
      err => { console.log(err); }
    );
  }

  update(form: NgForm){
    this.service.formData = form.value;
    this.service.putPaymentDetail().subscribe(
      res => { this.resetForm(form);
      this.toastr.success('Submitted successfully','Payment Detail Register');
      this.service.getPaymentDetailList();},
      err => { console.log(err); }
    );
  }
}
