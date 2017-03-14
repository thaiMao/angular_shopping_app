var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:8080/graphql'
    })
});
export function provideClient() {
    return client;
}
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                MaterialModule.forRoot(),
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
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map