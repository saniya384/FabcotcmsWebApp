import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTypeComponent } from './add-type/add-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { ServiceService } from 'src/app/shared/service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { GlobalConstants } from 'src/app/Common/global-constants';
import pdfMake from "pdfmake/build/pdfmake";

@Component({
  selector: 'app-fabric-type',
  templateUrl: './fabric-type.component.html',
  styleUrls: ['./fabric-type.component.css']
})
export class FabricTypeComponent implements OnInit {
  response: any;
  rows: any = [];
  data: any = {};
  columns: any = [];
  fabricTypeCount: number;
  fabricFilter: any[];



  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private service:ServiceService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.fetch((data) => {
      this.fabricFilter = [...data];
      this.rows = data;
      this.fabricTypeCount = this.rows.length;
    });
  }



  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.fabricFilter.filter(function (d) {
      return (d.type.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }




  fetch(cb) {
    let that = this;
    that.http
      .get(`${environment.apiUrl}/api/Products/GetAllFabricType`)
      .subscribe(res => {
        this.response = res;
        if (this.response.success == true) {
          that.data = this.response.data;
          this.fabricTypeCount = this.response.data.length;
          cb(this.data);
        }
        else {
          this.toastr.error(this.response.message, 'Message.');
        }
        // this.spinner.hide();
      }, err => {
        if (err.status == 400) {
          this.toastr.error(err.error.message, 'Message.');;
        }
        //  this.spinner.hide();
      });
  }



  deleteType(row) {
    Swal.fire({ 
      title: GlobalConstants.deleteTitle, 
      text: GlobalConstants.deleteMessage  +' '+'"'+ row.type +'"',
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

        this.http.delete(`${environment.apiUrl}/api/Products/DeleteFabricType/` + row.id)
          .subscribe(
            res => {
              this.response = res;
              if (this.response.success == true) {
                this.toastr.error(GlobalConstants.deleteSuccess, 'Message.');
                this.fetch((data) => {
                  this.rows = data;
                  this.fabricTypeCount = this.rows.length;
                });

              }
              else {
                this.toastr.error(GlobalConstants.exceptionMessage, 'Message.');
              }

            }, err => {
              if (err.status == 400) {
                this.toastr.error(this.response.message, 'Message.');
              }
            });
        // Swal.fire(
        //   'Record',
        //   'Deleted Successfully.',
        //   'success'
        // )
      }
    })

  }




  addTypeForm() {
    const modalRef = this.modalService.open(AddTypeComponent, { centered: true });
    modalRef.result.then((data) => {
      // on close
      if (data == true) {
        //  this.date = this.myDate;
        this.fetch((data) => {
          this.rows = data;
          this.fabricTypeCount = this.rows.length;
        });


      }
    }, (reason) => {
      // on dismiss
    });
  }


  editTypeForm(row) {
    const modalRef = this.modalService.open(EditTypeComponent, { centered: true });
    modalRef.componentInstance.userId = row.id;
    modalRef.result.then((data) => {
      // on close
      if (data == true) {
        //  this.date = this.myDate;
        this.fetch((data) => {
          this.rows = data;
        });

      }
    }, (reason) => {
      // on dismiss
    });
  }

// excell
exportAsXLSX(): void {
const filtered = this.data.map(row => ({
    SNo:row.id,
  FabricType :row.type,
   Details:row.description,
Status:row.active == true ? "Active" : "In-Active",
LastChange :row.createdDateTime + '|' + row.createdByName 


  }));
 
  this.service.exportAsExcelFile(filtered, 'Fabric Type');

}
// pdf ////////

generatePDF() {

  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'Fabric Type'
    },
    content: [
      {
        text: 'Fabric Type',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 100, 80, 40, 170 ],
          body: [
            ['S.no.', 'Fabric Type', 'Details', 'Status', 'Update Date Time | Updated By' ],
            ...this.data.map(row => (
              [row.id, row.type, row.description, row.active == true ? "Active" : "In-Active",
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


  pdfMake.createPdf(docDefinition).download('FabricType.pdf');
}

// print

printPdf() {

  let docDefinition = {
    pageSize: 'A4',
    info: {
      title: 'Fabric Type'
    },
    content: [
      {
        text: 'Fabric Type',
        style: 'heading',

      },

      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [30, 100, 80, 40, 170 ],
          body: [
            ['S.no.', 'Fabric Type', 'Details', 'Status', 'Update Date Time | Updated By' ],
            ...this.data.map(row => (
              [row.id, row.type, row.description, row.active == true ? "Active" : "In-Active",
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
