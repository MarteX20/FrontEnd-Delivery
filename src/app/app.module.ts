import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login', component: LoginComponent },
]
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
