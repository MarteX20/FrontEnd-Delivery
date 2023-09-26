import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { IProduct } from 'src/app/models/products';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    private url: string = 'http://localhost:3001/products';
    private urlBasket: string = 'http://localhost:3001/cart'

    constructor(private http: HttpClient) { }

    getProducts(){
        return this.http.get<any>(this.url)
    }

    getProductsFromBasket() {
        return this.http.get<any>(this.urlBasket)
    }

    postProductToBasket(product: IProduct){
        return this.http.post<IProduct>(this.urlBasket, product)
    }

    deleteProductFromBasket(id: string) {
        return this.http.delete<any>(`${this.urlBasket}/${id}`);
    }

    updateProductToBasket(product: IProduct) {
        return this.http.put<IProduct>(`${this.urlBasket}/${product.id}`, product);
    }
}
