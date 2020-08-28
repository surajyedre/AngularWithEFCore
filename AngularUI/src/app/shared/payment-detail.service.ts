import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail= {
    CVV: null,
    CardNumber: null,
    CardOwnerName: null,
    ExpirationDate: null,
    PMId: null
  };

  list: PaymentDetail[];

  readonly rootURL = 'http://localhost:56800/api';
  

  constructor(private http: HttpClient) { }

  postPaymentDetail(){
    return this.http.post(this.rootURL + '/PaymentDetail',this.formData);
  }

  putPaymentDetail(){
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.PMId,this.formData);
  }

  getPaymentDetailList(){
    this.http.get(this.rootURL + '/PaymentDetail')
    .toPromise()
    .then(res => this.list = res as PaymentDetail[])
  }

  deletePaymentDetail(id){
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id);
  }
}
