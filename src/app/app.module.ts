import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { AppComponent } from './app.component';
import { IngredientsService } from './ingredients.service';
import { TrackerService } from './tracker.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutItemComponent } from './checkout-item/checkout-item.component';
import { PaymentDirective } from './payment.directive';
import { PaymentService } from './payment.service';
import { OrderService } from './order.service';
import { AdminModule } from './admin/admin.module';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { SearchService } from './search.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { DialogService, DialogResult } from './dialog.service';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    //uri: 'https://cryptic-ravine-38483.herokuapp.com/graphql'
    uri: 'http://localhost:8080/graphql'
  })
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IngredientsComponent,
    HomeComponent,
    ProductComponent,
    SearchComponent,
    CheckoutComponent,
    PaymentComponent,
    CheckoutItemComponent,
    PaymentDirective,
    PaymentConfirmationComponent,
    DialogResult
  ],
  entryComponents: [DialogResult],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer),
    MaterialModule,
    RouterModule.forRoot([
      { path: 'home',
        component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'checkout',
        component: CheckoutComponent,
        canDeactivate: [CanDeactivateGuardService] },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'payment',
        canActivate: [PaymentService],
        component: PaymentComponent },
      { path: 'confirmation', component: PaymentConfirmationComponent }
    ]),
    ApolloModule.withClient(provideClient),
    AdminModule
  ],
  providers: [IngredientsService,
              TrackerService, PaymentService,
              OrderService, SearchService,
              CanDeactivateGuardService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
