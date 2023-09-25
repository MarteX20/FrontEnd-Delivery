import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    mess: string = ""

    ngOnInit(): void { }

    login(): void {
        this.authService.login(this.email, this.password).subscribe(
            (response) => {

                const token = this.authService.getToken();
                console.log('Token:', token);

                this.router.navigate(['/home']);
                console.log('Login effettuato:', response);
            },
            (error) => {
                if (error){
                    this.mess = "Credenziali non valide!"
                }
                console.error('Errore di login:', error);
            }
        );
    }
}
