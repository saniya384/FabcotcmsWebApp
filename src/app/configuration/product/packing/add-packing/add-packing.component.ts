import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-packing',
  templateUrl: './add-packing.component.html',
  styleUrls: ['./add-packing.component.css']
})
export class AddPackingComponent implements OnInit {
  data: any ={};
  response: any;
  active = true;


  constructor(private http:HttpClient,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

    
  get activeModal() {
    return this._NgbActiveModal;
  }

  addPacking(form:NgForm)
  {
    if (form.status == "INVALID") {

      this.toastr.error("Invalid Form", 'Message.');
    }
    else{
    let varr=  {
      "name": this.data.name,
      "description":  this.data.description,
      "active": this.active,
     
    }

    this.http.
    post(`${environment.apiUrl}/api/Products/AddPacking`,varr)
    .subscribe(
      res=> { 
  
        this.response = res;
        if (this.response.success == true){
          this.toastr.success(this.response.message, 'Message.');
      
          // this.buyerForm.reset();
          this.activeModal.close(true);
        }
        else {
          this.toastr.error(this.response.message, 'Message.');
            }

      }, err => {
        if (err.status == 400) {
          this.toastr.error(this.response.message, 'Message.');
        }
      });
  }
}


}
