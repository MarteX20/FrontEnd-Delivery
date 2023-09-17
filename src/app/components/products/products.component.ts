import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    constructor(private http: HttpClient) { }

    getProducts(page: number, order: string): Observable<QUI_INTERFACE_PRODOTTI[]> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('order', order);
        const headers = new HttpHeaders({
            Autorization: Bearer ${ localStorage.getItem('token') }
    });
    return this.http.get<any>(this.urlRecipes, { params, headers })
    .pipe(map(response => response.content));
}

ngOnInit(): void {

}

}
