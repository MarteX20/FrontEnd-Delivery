import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { BasketComponent } from './components/basket/basket.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { RouterModule, Route } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './auth/token.interceptor';
import { AppServiceService } from './services/app-service.service';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from './components/auth.guard';
import { PaypalComponent } from './components/paypal/paypal.component';


const routes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'basket', component: BasketComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'payment', component: PaypalComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        ProductsComponent,
        BasketComponent,
        DialogBoxComponent,
        NotFoundComponent,
        ContactComponent,
        PaypalComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('token'),
                allowedDomains: ['localhost:3001'],
                disallowedRoutes: [],
            },
        })
    ],
    providers: [AppServiceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        }],
    bootstrap: [AppComponent]

})
export class AppModule { }
