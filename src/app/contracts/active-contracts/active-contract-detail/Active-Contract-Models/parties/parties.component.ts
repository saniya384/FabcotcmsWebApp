import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dateformater } from 'src/app/shared/dateformater';
import { ServiceService } from 'src/app/shared/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {

  dateformater: Dateformater = new Dateformater();  
  @Input() contractId;
  data:any ={};
  response: any;
  certificate: any={};
  buyer: any={};
  buyerPOC: any={};
  seller: any={};
  sellerPOC: any={};


  
  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private http: HttpClient,
    private service: ServiceService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetBuyersDropdown();
    this.GetBuyersPOCDropdown();
    this.GetSellersDropdown();
    this.GetSellersPOCDropdown();
    this.GetCertificateDropdown();
    this.getContractPartiesData();

  }

  get activeModal() {
    return this._NgbActiveModal;
  }


  getContractPartiesData() {
    this.http.get(`${environment.apiUrl}/api/Contracts/GetContractPartiesById/` + this.contractId)
      .subscribe(
        res => {
          this.response = res;
          if (this.response.success == true) {
            this.data = this.response.data;
            this.data.poDate = this.dateformater.fromModel(this.data.poDate);
            this.data.contractDate = this.dateformater.fromModel(this.data.contractDate);
            
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



  GetBuyersDropdown() {
    this.service.getBuyers().subscribe(res => {
      this.response = res;
      if (this.response.success == true) {
        this.buyer = this.response.data;
      }
      else {
        this.toastr.error(this.response.message, 'Message.');
      }
    })
  }


  GetBuyersPOCDropdown() {
    this.service.getBuyersPOC().subscribe(res => {
      this.response = res;
      if (this.response.success == true) {
        this.buyerPOC = this.response.data;
      }
      else {
        this.toastr.error(this.response.message, 'Message.');
      }
    })
  }


  GetSellersDropdown() {
    this.service.getSellers().subscribe(res => {
      this.response = res;
      if (this.response.success == true) {
        this.seller = this.response.data;
      }
      else {
        this.toastr.error(this.response.message, 'Message.');
      }
    })
  }


  GetSellersPOCDropdown() {
    this.service.getSellersPOC().subscribe(res => {
      this.response = res;
      if (this.response.success == true) {
        this.sellerPOC = this.response.data;
      }
      else {
        this.toastr.error(this.response.message, 'Message.');
      }
    })
  }




  GetCertificateDropdown() {
    this.service. getCertification().subscribe(res => {
      this.response = res;
      if (this.response.success == true) {
        this.certificate = this.response.data;
      }
      else {
        this.toastr.error(this.response.message, 'Message.');
      }
    })
  }





  addContractParties() {
    this.data.poDate = this.dateformater.toModel(this.data.poDate);
    this.data.contractDate = this.dateformater.toModel(this.data.contractDate);
    let varr = {

      "contractId": this.contractId,
      "poNumber": this.data.poNumber.toString(),
      "poDate": this.data.poDate,
      "contractNo": this.data.contractNo,
      "contractDate": this.data.contractDate,
      "buyerId":this.data.buyerId,
      "buyerPOCId": this.data.buyerPOCId,
      "sellerId": this.data.sellerId,
      "sellerPOCId": this.data.sellerPOCId,
      "sellerContract":this.data.sellerContract,
      "certificateId": this.data.certificateId,
    }

    this.http.
      post(`${environment.apiUrl}/api/Contracts/AddContractParties`, varr)
      .subscribe(
        res => {

          this.response = res;
          if (this.response.success == true) {
            this.toastr.success(this.response.message, 'Message.');
            // this.getEnquiryData(this.objEnquiry);
            this.activeModal.close(true);
            this.getContractPartiesData();
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
