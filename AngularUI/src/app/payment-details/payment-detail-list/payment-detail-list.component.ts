import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getPaymentDetailList();
  }

  populateForm(pd: PaymentDetail) {
    console.log('pd');
    console.log(pd);
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(PMId) {
    if (confirm('Are you sure to delete the record?')) {
      this.service.deletePaymentDetail(PMId).subscribe(res => {
        this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        this.service.getPaymentDetailList();
      }, err => { console.log(err); })
    }
  }
}
