import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AddTimeActionComponent } from './add-time-action/add-time-action.component';
import { EditTimeActionComponent } from './edit-time-action/edit-time-action.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalConstants } from 'src/app/Common/global-constants';
import { ServiceService } from 'src/app/shared/service.service';
import pdfMake from "pdfmake/build/pdfmake";
@Component({
  selector: 'app-time-action-items',
  templateUrl: './time-action-items.component.html',
  styleUrls: ['./time-action-items.component.css']
})
export class TimeActionItemsComponent implements OnInit {

  response: any;
  rows: any = [];
  columns: any = [];
  data: any = {};
  TnaCount: number;
  TnaFilter: any = [];
  TnaUrl = '/api/TextileGarments/GetAllTnaAction'
  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private service: ServiceService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.service.fetch((data) => {
      this.rows = data;
      this.TnaCount = this.rows.length;
    } , this.TnaUrl);
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.TnaFilter.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  deleteAction(id) {
    Swal.fire({
      title: GlobalConstants.deleteTitle, //'Are you sure?',
      text: GlobalConstants.deleteMessage + ' ' + '"' + id.name + '"',
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

        this.http.delete(`${environment.apiUrl}/api/TextileGarments/DeleteTnaAction/` + id.id)
          .subscribe(
            res => {
              this.response = res;
              if (this.response.success == true) {
                this.toastr.error(GlobalConstants.deleteSuccess, 'Message.');
                this.service.fetch((data) => {
                  this.rows = data;
                  this.TnaCount = this.rows.length;
                } , this.TnaUrl);

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




  addActionForm() {
    const modalRef = this.modalService.open(AddTimeActionComponent, { centered: true });
    modalRef.result.then((data) => {
      // on close
      if (data == true) {
        //  this.date = this.myDate;
        this.service.fetch((data) => {
          this.rows = data;
          this.TnaCount = this.rows.length;
        } , this.TnaUrl);


      }
    }, (reason) => {
      // on dismiss
    });
  }


  editActionForm(row) {
    const modalRef = this.modalService.open(EditTimeActionComponent, { centered: true });
    modalRef.componentInstance.userId = row.id;
    modalRef.result.then((data) => {
      // on close
      if (data == true) {
        //  this.date = this.myDate;
        this.service.fetch((data) => {
          this.rows = data;
        } , this.TnaUrl);

      }
    }, (reason) => {
      // on dismiss
    });
  }
// excel /////////////////////////////
  exportAsXLSX(): void {
    const filtered = this.data.map(row => ({
      SNo: row.id,
      ActionName: row.name,
      Details: row.description,
      LastChange: row.updatedDateTime + '|' + row.updatedByName
    }));

    this.service.exportAsExcelFile(filtered, 'TnA Actions');

  }
// pdf////////////
generatePDF() {
   
  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'TnA List'
    },
    content: [
      {
        text: 'TnA List',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 100, 100, 170  ],
          body: [
            ['S.no.', 'Action Name', 'Details', 'Update Date Time | Update By '],
            ...this.data.map(row => (
              [row.id, row.name, row.description, 
              row.updatedDateTime + '|' + row.updatedByName] 
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
  pdfMake.createPdf(docDefinition).download('TnA.pdf');
}

// print 
printPdf() {
   
  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'TnA List'
    },
    content: [
      {
        text: 'TnA List',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 100, 100, 170  ],
          body: [
            ['S.no.', 'Action Name', 'Details', 'Update Date Time | Update By '],
            ...this.data.map(row => (
              [row.id, row.name, row.description, 
              row.updatedDateTime + '|' + row.updatedByName] 
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

