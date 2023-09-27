import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    showButtons: boolean = true
    nomeUser: String = ''
    userEmail: String = ''
    userAddress: String = ''

    constructor(private authSrv: AuthService, private router: Router ) { }

    ngOnInit(): void {
        if (this.authSrv.isLoggedIn()){
            this.showButtons = false;

            const token = localStorage.getItem('token');
            if (token) {
                const tokenPayload = this.decodeToken(token);

                this.nomeUser = tokenPayload.name
                this.userEmail = tokenPayload.email
                this.userAddress = tokenPayload.address
            }
        }
    }

    logout() {
        this.authSrv.logout().subscribe(
            (response) => {
                console.log(response);

                this.router.navigate(['/home']);
            },
            (error) => {
                console.error(error);
            }
        );
    }


    private decodeToken(token: string): any {
        const payload = token.split('.')[1]
        const decodePayload = window.atob(payload)
        return JSON.parse(decodePayload)
    }
}
