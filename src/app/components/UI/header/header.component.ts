import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    showButtons: boolean = true;

    constructor(private authSrv: AuthService ) { }

    ngOnInit(): void {
        if (this.authSrv.isLoggedIn()){
            this.showButtons = false;
        }
    }

}
