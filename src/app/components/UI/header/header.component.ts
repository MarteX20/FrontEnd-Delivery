import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
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

    constructor(private authSrv: AuthService ) { }

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

    private decodeToken(token: string): any {
        const payload = token.split('.')[1]
        const decodePayload = window.atob(payload)
        return JSON.parse(decodePayload)
    }
}
