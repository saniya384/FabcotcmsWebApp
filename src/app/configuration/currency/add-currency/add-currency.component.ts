import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';
import { Dateformater } from 'src/app/shared/dateformater';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.css']
})
export class AddCurrencyComponent implements OnInit {
  dateformater: Dateformater = new Dateformater();
  data:any={};
  response: any;
  constructor(private http:HttpClient,
    private service: ServiceService,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }
  
  addCurrency(form:NgForm)
  {
    
    // if (form.status == "INVALID") {

    //   this.toastr.error("Invalid Form", 'Message.');
    // }

    // else{
      this.data.validFrom = this.dateformater.toModel(this.data.validFrom);
    let varr=  {
      "validFrom": this.data.validFrom,
      "currencyCode":  this.data.currencyCode,
      "rate": this.data.rate,
      "details": this.data.details
    }

    this.http.
    post(`${environment.apiUrl}/api/Configs/AddCurrencyRate`,varr)
    .subscribe(
      res=> { 
  
        this.response = res;
        if (this.response.success == true){
          this.toastr.success(this.response.message, 'Message.');
      
          // this.buyerForm.reset();
          this.activeModal.close(true);
        }
        else {
          this.toastr.error('Something went Worng', 'Message.');
            }

      }, (err: HttpErrorResponse) => {
        const messages = this.service.extractErrorMessagesFromErrorResponse(err);
        this.toastr.error(messages.toString(), 'Message.');
        console.log(messages);
        if (err.status == 400) {
          this.toastr.error(this.response.message, 'Message.');
        }
      });
  }
// }

}
