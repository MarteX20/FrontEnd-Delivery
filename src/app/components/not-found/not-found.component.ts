import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    template: '<p>Pagina non trovata, verrai reindirizzato sulla Home tra 3 secondi...</p>',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

    constructor(private router: Router) {
        setTimeout(() => {
            this.router.navigate(['/'])
        }, 3000)
    }

    ngOnInit(): void {
    }

}
