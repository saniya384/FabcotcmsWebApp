import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationModule } from './configuration/configuration.module';
import { BusinessEnquryModule } from './business-enqury/business-enqury.module';
import { HomeComponent } from './home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnquiryItemsComponent } from './shared/MODLES/enquiry-items/enquiry-items.component';
import { QuotationComponent } from './shared/MODLES/quotation/quotation.component';
import { LoginComponent } from './login/login.component';
import { ActiveContractsComponent } from './contracts/active-contracts/active-contracts.component';
import { ArchivedContractsComponent } from './contracts/archived-contracts/archived-contracts.component';
import { BillingAndPaymentModule } from './billing-and-payment/billing-and-payment.module';
import { ActiveContractDetailComponent } from './contracts/active-contracts/active-contract-detail/active-contract-detail.component';
import { CloudDocumentationModule } from './cloud-documentation/cloud-documentation.module';
import { AuthGuard } from './shared/auth-service/auth.guard';
import { EnquiryNotesComponent } from './shared/MODLES/enquiry-notes/enquiry-notes.component';
import { PartiesComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/parties/parties.component';
import { ProductAndSpecificationComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/product-and-specification/product-and-specification.component';
import { QualityCostingComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/quality-costing/quality-costing.component';
import { PaymentDeliveryComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/payment-delivery/payment-delivery.component';
import { DeliveryTimelineComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/delivery-timeline/delivery-timeline.component';
import { CommisionKickbackComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/commision-kickback/commision-kickback.component';
import { EmployeeCommissionComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/employee-commission/employee-commission.component';
import { RemarksComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/remarks/remarks.component';
import { QuantityCostingComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/quantity-costing/quantity-costing.component';
import { TemplateComponent } from './template/template.component';
import { ContractsRoutingModule } from './contracts/contracts-routing.module';
import { CloudDocumentationRoutingModule } from './cloud-documentation/cloud-documentation.routing.module';
import { LOCComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/loc/loc.component';
import { PRODUCTPLANComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/product-plan/product-plan.component';
import { SALEINVOICEComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/sale-invoice/sale-invoice.component';
import { BusinessEnquryRoutingModule } from './business-enqury/business-enqury-routing.module';
import { ItemsComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/items/items.component';
import { CloudDocumentationComponent } from './cloud-documentation/cloud-documentations.component';
import { LayoutComponent } from './template/layout/layout.omponent';
import { ColorPickerModule } from 'ngx-color-picker';
import { DateConvertor } from './shared/date-formater';
import { EditTnaComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/edit-tna/edit-tna.component';
import { SaleInvoiceItemComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/sale-invoice-item/sale-invoice-item.component';
import { ContractNoteComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/contract-note/contract-note.component';
import { AuthInterceptor } from './shared/auth-service/auth.interceptor';
import { TnaLogHistoryComponent } from './contracts/active-contracts/active-contract-detail/Active-Contract-Models/tna-log-history/tna-log-history.component';
import { StatusComponent } from './shared/MODLES/status/status.component';
import { OnholdContractsComponent } from './contracts/onhold-contracts/onhold-contracts.component';
import { ContractsModule } from './Yarn Local/contracts/contracts.module';
import { YarnBillingAndPaymentModule } from './Yarn Local/yarn-billing-and-payment/yarn-billing-and-payment.module';
import { YarnConfigurationModule } from './Yarn Local/yarn-configuration/yarn-configuration.module';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { HistoryContractComponent } from './shared/MODLES/history-contract/history-contract.component';
import { ContractOwnerComponent } from './contracts/contract-owner/contract-owner.component';
import { NgProgressModule } from 'ngx-progressbar';
import { ArticleRevisePopupComponent } from './shared/MODLES/article-revise-popup/article-revise-popup.component';
import { ReportsComponent } from './shared/reports/reports.component';
import { FilterPopUpComponent } from './shared/reports/filter-pop-up/filter-pop-up.component';
import { AdvanceFilterComponent } from './template/advance-filter/advance-filter.component';
import { BulkPrintComponent } from './bulk-print/bulk-print.component';
import { BillInvoicesComponent } from './accounts/bill-invoices/bill-invoices.component';
import { SaleInvoiceBillComponent } from './accounts/sale-invoice-bill/sale-invoice-bill.component';
import { AccBulkPrintComponent } from './accounts/acc-bulk-print/acc-bulk-print.component';
import { BillBreakupComponent } from './accounts/bill-breakup/bill-breakup.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { AllContractReportComponent } from './shared/reports/all-contract-report/all-contract-report.component';
import { SellerMappingComponent } from './shared/mappings/seller-mapping/seller-mapping.component';
import { AddEditMappingsComponent } from './shared/mappings/seller-mapping/add-edit-mappings/add-edit-mappings.component';



const appRoutes: Routes = [] 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnquiryItemsComponent,
    QuotationComponent,
    LoginComponent,
    ActiveContractsComponent,
    ArchivedContractsComponent,
    ActiveContractDetailComponent,
    EnquiryNotesComponent,
    PartiesComponent,
    ProductAndSpecificationComponent,
    QualityCostingComponent,
    PaymentDeliveryComponent,
    DeliveryTimelineComponent,
    CommisionKickbackComponent,
    EmployeeCommissionComponent,
    RemarksComponent,
    QuantityCostingComponent,
    TemplateComponent,
    LayoutComponent,
    LOCComponent,
    PRODUCTPLANComponent,
    SALEINVOICEComponent,
    ItemsComponent,
    CloudDocumentationComponent,
    EditTnaComponent,
    SaleInvoiceItemComponent,
    ContractNoteComponent,
    TnaLogHistoryComponent,
    StatusComponent,
    OnholdContractsComponent,
    SignUpComponent,
    HistoryContractComponent,
    ContractOwnerComponent,
    ArticleRevisePopupComponent,
    ReportsComponent,
    FilterPopUpComponent,
    AdvanceFilterComponent,
    BulkPrintComponent,
    BillInvoicesComponent,
    SaleInvoiceBillComponent,
    AccBulkPrintComponent,
    BillBreakupComponent,
    AllContractReportComponent,
    SellerMappingComponent,
    AddEditMappingsComponent,
   

  


    // AddEnquiryComponent,
    // SearchEnquiryComponent,
    // AddmodalComponent,
    // ArtienquirymodalComponent,

    // PackagingComponent,
    // DesignTypeComponent,
    // ProcessTypeComponent,
    // ProcessenqmodalComponent,
    // AddcitymodalComponent,
    // AddcertmodalComponent, 
    // PaymentTermComponent,
    // PriceTermComponent,
    // ActiveEnquiryComponent

  ],


  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ConfigurationModule,
    BusinessEnquryModule,
    FormsModule,
    NgProgressModule,
    ContractsModule,
    CloudDocumentationModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudDocumentationRoutingModule,
    BrowserAnimationsModule,
    ContractsRoutingModule,
    NgxDatatableModule,
    BillingAndPaymentModule,
    BusinessEnquryRoutingModule,
    BusinessEnquryModule,
    RouterModule,
    YarnConfigurationModule,
    YarnBillingAndPaymentModule,
    ColorPickerModule,NgxSpinnerModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'success', // set defaults here
      cancelButtonType: 'danger',
      cancelText: 'No',
      confirmText: 'Yes',

    }),
    NgxScrollTopModule,
  ],

  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    // {provide: NgbDateParserFormatter, useFactory: () => new DateConvertor('EEE, dd-MMM-yyyy')}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
