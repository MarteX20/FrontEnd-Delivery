import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    private url: string = 'http://localhost:3001/products';

    constructor(private http: HttpClient) { }

    getProducts(){
        return this.http.get<any>(this.url)
    }

    // getProduct(id: string){
    //     return this.http.get<Product>(`${this.url}/${id}`)
    // }
}
