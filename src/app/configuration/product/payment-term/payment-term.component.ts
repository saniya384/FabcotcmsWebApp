import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalConstants } from 'src/app/Common/global-constants';
import { ServiceService } from 'src/app/shared/service.service';
import { listenerCount } from 'events';
import pdfMake from "pdfmake/build/pdfmake";
@Component({
  selector: 'app-payment-term',
  templateUrl: './payment-term.component.html',
  styleUrls: ['./payment-term.component.css']
})
export class PaymentTermComponent implements OnInit {
  response: any;
  rows: any = [];
  data: any = {};
  columns: any = [];
  paymentTermCount: number;
  myDate = Date.now();
  paymentTermFilter: any[];
  paymentTermUrl = '/api/Products/GetAllPaymentTerm'

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private service:ServiceService,
    private modalService: NgbModal,) { }


  ngOnInit(): void {
    this.service.fetch((data) => {
      this.paymentTermFilter = [...data];
      this.rows = data;
      this.paymentTermCount = this.rows.length;
    }, this.paymentTermUrl);
  }

// searching

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.paymentTermFilter.filter(function (d) {
      return (d.term.toLowerCase().indexOf(val) !== -1 || !val);
    })  ;
    this.rows = temp;

  }


  deletePayment(id) {
    Swal.fire({
      title: GlobalConstants.deleteTitle, //'Are you sure?',
      text: GlobalConstants.deleteMessage+' '+'"'+ id.term +'"',
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

        this.http.delete(`${environment.apiUrl}/api/Products/DeletePaymentTerm/` + id.id)
          .subscribe(
            res => {
              this.response = res;
              if (this.response.success == true) {
                this.toastr.error(this.response.message, 'Message.');
                this.service.fetch((data) => {
                  this.rows = data;
                } , this.paymentTermUrl);

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

  addPaymentForm() {
    const modalRef = this.modalService.open(AddPaymentComponent, { centered: true });
    modalRef.result.then((data) => {
      // on close
      if (data == true) {
        //  this.date = this.myDate;
        this.service.fetch((data) => {
          this.rows = data;
          this.paymentTermCount = this.rows.length;
        } , this.paymentTermUrl);


      }
    }, (reason) => {
      // on dismiss
    });
  }


  editPaymentForm(row) {
    const modalRef = this.modalService.open(EditPaymentComponent, { centered: true });
    modalRef.componentInstance.userId = row.id;
    modalRef.result.then((data) => {
      // on close
      if (data == true) {
        //  this.date = this.myDate;
        this.service.fetch((data) => {
          this.rows = data;
        }, this.paymentTermUrl);

      }
    }, (reason) => {
      // on dismiss
    });
  }
//  excel
  exportAsXLSX(): void {
    const filtered = this.data.map(row => ({
      SNo:row.id,
    PaymentTerm :row.term,
     Details:row.description,
  Status:row.active == true ? "Active" : "In-Active",
  LastChange :row.updatedDateTime + '|' + row.updatedByName 
  
  
    }));
   
    this.service.exportAsExcelFile(filtered, 'Payment Term');
  
  }
// / pdf //////////
  generatePDF() {

    let docDefinition = {
      pageSize: 'A4',
      info: {
        title: 'Payment Term List'
      },
      content: [
        {
          text: 'Payment Term List',
          style: 'heading',
  
        },
  
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [30, 80, 80, 50, 170 ],
            body: [
              ['S.no.', 'Payment Term', 'Details', 'Status', 'Update Date Time | Updated By' ],
              ...this.data.map(row => (
                [row.id, row.term, row.description, row.active == true ? "Active" : "In-Active",
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
  
  
    pdfMake.createPdf(docDefinition).download('PaymentTerm.pdf');
  }
//  print //

printPdf() {

  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'Payment Term List'
    },
    content: [
      {
        text: 'Payment Term List',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 80, 80, 50, 170 ],
          body: [
            ['S.no.', 'Payment Term', 'Details', 'Status', 'Update Date Time | Updated By' ],
            ...this.data.map(row => (
              [row.id, row.term, row.description, row.active == true ? "Active" : "In-Active",
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