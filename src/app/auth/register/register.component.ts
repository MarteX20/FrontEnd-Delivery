import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    email: string = '';
    password: string = '';
    name: string = '';
    surname: string = '';
    tel: string = '';
    address: string = '';
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void { }

    register() {
        this.authService.register(this.name, this.surname, this.email, this.password, this.tel, this.address).subscribe(
            (response) => {
                console.log('Registrazione effettuata:', response);
                this.router.navigate(['/login']);
            },
            (error) => {
                console.error('Registration error:', error);

            }
        );
    }
}



