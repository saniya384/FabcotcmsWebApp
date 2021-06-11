import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/Common/global-constants';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {EditDispatchComponent} from '../dispatched-register/edit-dispatch/edit-dispatch.component'
@Component({
  selector: 'app-dispatched-register',
  templateUrl: './dispatched-register.component.html',
  styleUrls: ['./dispatched-register.component.css']
})
export class DispatchedRegisterComponent implements OnInit {
  response: any;
  data: any = {};
  rows: any = [];
  columns: any = [];
  temp: any[];
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal,
 
  ) { }
  ngOnInit(): void {
    this.fetch((data) => {
      this.temp = [...data]; 
      this.rows = data;
    });
  }

  
  allDispatchces(){
    console.log("allDispatchces")
  }
  
  pendingSaleInv(){
    console.log("pendingSaleInv")
  }
  
  recSaleInv(){
    console.log("recSaleInv")
  }
  searchFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return (
        d.name.toLowerCase().indexOf(val) !== -1 ||
        d.name.toLowerCase().indexOf(val) !== -1 ||
         !val);
    });
    this.rows = temp;
  }

  fetch(cb) {
    this.http
      .get(`${environment.apiUrl}/api/YarnContracts/GetAllDispatchRegister`)
      .subscribe(res => {
        this.response = res;
  
        if (this.response.success == true) {
          this.data = this.response.data
          cb(this.data)
        }
        else {
          this.toastr.error(this.response.message, 'Message.');
       this.spinner.hide();
        }
        // this.spinner.hide();
      }, err => {
        if (err.status == 400) {
          this.toastr.error(err.error.message, 'Message.');;
        }
        //  this.spinner.hide();
      });
  }



  
  deleteContract(obj) {
    Swal.fire({
      title: GlobalConstants.deleteTitle, //'Are you sure?',
      text: GlobalConstants.deleteMessage + ' ' + '"' + obj.autoContractNumber + '"',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ed5565',
      cancelButtonColor: '#dae0e5',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      reverseButtons: true,
      position: 'top',
    }).then((result) => {
      if (result.isConfirmed) {
  this.spinner.show();
        this.http.delete(`${environment.apiUrl}/api/YarnContracts/DeleteDispatchRegister/` + obj.id)
          .subscribe(
            res => {
              this.response = res;
              if (this.response.success == true) {
                this.toastr.error(this.response.message, 'Message.');
                this.fetch((data) => {
                  this.rows = data;
                  this.spinner.hide();
                });
                
  
              }
              else {
                this.toastr.error(this.response.message, 'Message.');
             this.spinner.hide();
              }
  
            }, err => {
              if (err.status == 400) {
                this.toastr.error(this.response.message, 'Message.');
              this.spinner.hide();
              }
            });
  
      }
    })
  
  }
   
  editDispatch(rows) {
    const modalRef = this.modalService.open(EditDispatchComponent , { centered: true });
    modalRef.componentInstance.dispatchId = rows.id;

    modalRef.result.then((data) => {
      // on close
      // this.fetch((data) => {
      //   this.rows = data;
    
      // });
      
      if (data == true) {
     

      }
    }, (reason) => {
      // on dismiss
    });
  }
}
