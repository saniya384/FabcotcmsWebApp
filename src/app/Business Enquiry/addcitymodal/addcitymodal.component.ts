import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/shared/service.service';
@Component({
  selector: 'app-addcitymodal',
  templateUrl: './addcitymodal.component.html',
  styleUrls: ['./addcitymodal.component.css']
})
export class AddcitymodalComponent implements OnInit {
  country:any=[];
  countryId:null;
  response:any;
  data:any={};

  constructor(private http:HttpClient,
    private toastr: ToastrService,
    private _NgbActiveModal: NgbActiveModal,
    private service: ServiceService) { }

  ngOnInit(): void {
    {
      this.service.getCountry().subscribe(res => {
        this.response = res;
        if (this.response.success == true) {
          this.data = this.response.data;
        
    
        }
        else {
          this.toastr.error('Something went Worng', 'Message.');
        }
      })
    }
  }

    
  get activeModal() {
    return this._NgbActiveModal;
  }


  // getCountry()
  // {
  //   this.http.get(`${environment.apiUrl}/api/Lookups/Countries`)
  //   .subscribe(
  //     res=> { 
  //       this.response = res;
  //       if (this.response.success == true){
  //         this.country =this.response.data;
  //       }
  //       else {
  //         this.toastr.error('Something went Worng', 'Message.');
  //           }

  //     }, err => { 
  //       if (err.status == 400) {
  //         this.toastr.error('Something went Worng', 'Message.');
  //       }
  //     });
  // }



  
  addCity()
  {
    let varr=  {
      "name": this.data.name,
      "details":this.data.details,
      "countryId":this.countryId,
      "active":this.data.active
     
    }

    this.http.
    post(`${environment.apiUrl}/api/Configs/AddCity`,varr)
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

      }, err => {
        if (err.status == 400) {
          this.toastr.error('Something went Worng', 'Message.');
        }
      });
  }



}
