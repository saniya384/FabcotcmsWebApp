import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
// import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalConstants } from 'src/app/Common/global-constants';
import { ServiceService } from 'src/app/shared/service.service';
import pdfMake from "pdfmake/build/pdfmake";
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  response:any;
  rows:any=[];
  columns:any=[];
  data:any={};
  certificateCount: number;
  certificateFilter: any=[];
certificateUrl = '/api/TextileGarments/GetAllCertificate'

  constructor(private http:HttpClient,
              private toastr: ToastrService,
              private service:ServiceService,
              private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.service.fetch((data) => {
      this.certificateFilter = [...data];
      this.rows = data;
      this.certificateCount = this.rows.length;
    } , this.certificateUrl);
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.certificateFilter.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1  || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  deleteCertificate(id){
    Swal.fire({
      title: GlobalConstants.deleteTitle, //'Are you sure?',
      text: GlobalConstants.deleteMessage+' '+'"'+ id.name +'"',
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
    
        this.http.delete(`${environment.apiUrl}/api/TextileGarments/DeleteCertificate/`+id.id )
        .subscribe(
          res=> { 
            this.response = res;
            if (this.response.success == true){
             this.toastr.error(GlobalConstants.deleteSuccess, 'Message.');
             this.service.fetch((data) => {
              this.rows = data;
              this.certificateCount = this.rows.length;
            } , this.certificateUrl);
              
            }
            else {
              this.toastr.error(GlobalConstants.exceptionMessage, 'Message.');
                }
     
          }, err => {
            if (err.status == 400) {
              this.toastr.error(this.response.message, 'Message.');
            }
          });
      }
    })
    
    }


  addCertificateForm(check){
    const modalRef = this.modalService.open(EditCertificateComponent, { centered: true });
       modalRef.componentInstance.statusCheck =check;
      //  modalRef.componentInstance.name =componentName;

          modalRef.result.then((data) => {
         // on close
          if(data ==true){
          //  this.date = this.myDate;
           this.service.fetch((data) => {
            this.rows = data;
            this.certificateCount = this.rows.length;
          } , this.certificateUrl);
           
  
         }
       }, (reason) => {
         // on dismiss
       });
  } 
  

  editCertificateForm(row,check){
    const modalRef = this.modalService.open(EditCertificateComponent, { centered: true });
    modalRef.componentInstance.Id =row.id; //just for edit.. to access the needed row
    modalRef.componentInstance.statusCheck = check;
          modalRef.result.then((data) => {
         // on close
          if(data ==true){
          //  this.date = this.myDate;
           this.service.fetch((data) => {
            this.rows = data;
          } , this.certificateUrl);
         }
       }, (reason) => {
         // on dismiss
       });
  } 
  // excel ///
  exportAsXLSX(): void {
    const filtered = this.data.map(row => ({
      SNo:row.id,
    CertificateName :row.name,
     Details:row.description,
  Status:row.active == true ? "Active" : "In-Active",
  LastChange :row.updatedDateTime + '|' + row.updatedByName 
   }));
   
    this.service.exportAsExcelFile(filtered, 'Certificate');
  
  }
// pdf ///

generatePDF() {

  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'Certificate List'
    },
    content: [
      {
        text: 'Certificate List',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 80, 80, 50, 170 ],
          body: [
            ['S.no.', 'Certificate Name', 'Details', 'Status', 'Update Date Time | Updated By' ],
            ...this.data.map(row => (
              [row.id, row.name, row.description, row.active == true ? "Active" : "In-Active",
              row.updatedDateTime + '|' + row.updatedByName 
               ] 
            ))
          ]
        }
      }
    ],
    styles: {
      heading: {
        fontSize: 18,
        alignment: 'center',
        margin: [0, 15, 0, 30]
      }
    }

  };


  pdfMake.createPdf(docDefinition).download('Certificate.pdf');
}

// print 
printPdf() {

  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'Certificate List'
    },
    content: [
      {
        text: 'Certificate List',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 80, 80, 50, 170 ],
          body: [
            ['S.no.', 'Certificate Name', 'Details', 'Status', 'Update Date Time | Updated By' ],
            ...this.data.map(row => (
              [row.id, row.name, row.description, row.active == true ? "Active" : "In-Active",
              row.updatedDateTime + '|' + row.updatedByName 
               ] 
            ))
          ]
        }
      }
    ],
    styles: {
      heading: {
        fontSize: 18,
        alignment: 'center',
        margin: [0, 15, 0, 30]
      }
    }

  };


  pdfMake.createPdf(docDefinition).print();
}



}

