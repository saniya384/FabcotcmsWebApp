import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from '../yarn-configuration/buyer/buyer.component';
import { TemplateComponent } from 'src/app/template/template.component';
import { SellerComponent } from './seller/seller.component';
import { ForeignAgentComponent } from './foreign-agent/foreign-agent.component';
import { ArticlesComponent } from './articles/articles.component';
import { PackingComponent } from './product/packing/packing.component';
import { FabricTypeComponent } from './product/fabric-type/fabric-type.component';
import { PaymentTermComponent } from './product/payment-term/payment-term.component';
import { PriceTermComponent } from './product/price-term/price-term.component';
import { BankComponent } from './bank-info/bank/bank.component';
import { BankAccountsComponent } from './bank-info/bank-accounts/bank-accounts.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { CurrencyComponent } from './currency/currency.component';
import { WeaveComponent } from './product/weave/weave.component';
import { PieceLengthComponent } from './product/piece-length/piece-length.component';
import { ContainerComponent } from './product/container/container.component';
import { WeftComponent } from './product/weft/weft.component';
import { WarpComponent } from './product/warp/warp.component';
import { SelvedgeComponent } from './product/selvedge/selvedge.component';
import { PickInsertionComponent } from './product/pick-insertion/pick-insertion.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { ConfigContractOwnerComponent } from './config-contract-owner/config-contract-owner.component';
import { GeneralSettingsComponent } from 'src/app/configuration/general-settings/general-settings.component';



const routes: Routes = [
  { path:'FabCot', component:TemplateComponent,
  // canActivate:[AuthGuard],

  children:[

    { path: 'buyers' ,  component: BuyerComponent},
    { path: 'seller' , component:SellerComponent},
    { path: 'external-agents' ,  component: ForeignAgentComponent},
    { path: 'article' ,  component: ArticlesComponent},
    { path: 'fabric-type' ,  component: FabricTypeComponent},
    { path: 'payment-term' ,  component: PaymentTermComponent},
    { path: 'price-term' ,  component: PriceTermComponent},
    { path: 'packing' ,  component: PackingComponent},
    { path: 'bank' ,  component: BankComponent},
    { path: 'bank-account' ,  component: BankAccountsComponent},
    { path: 'city' ,  component: CityComponent},
    { path: 'country' ,  component: CountryComponent},
    { path: 'currency' ,  component: CurrencyComponent},
    { path: 'weave' ,  component: WeaveComponent},
    { path: 'piece-length' ,  component: PieceLengthComponent},
    { path: 'container' ,  component: ContainerComponent},
    { path: 'selvedge' ,  component: SelvedgeComponent},
    { path: 'pick-insertion' ,  component: PickInsertionComponent},
    { path: 'Warp' ,  component: WarpComponent},
    { path: 'Weft' ,  component: WeftComponent},
    { path: 'Beneficiary' ,  component: BeneficiaryComponent},
    { path: 'config-contract-owner' ,  component: ConfigContractOwnerComponent},
    { path: 'general-settings', component: GeneralSettingsComponent },
]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class YarnConfigurationRoutingModule { }
