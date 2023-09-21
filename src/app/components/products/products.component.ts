import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './products';
import { Observable, Subscription, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products:  any

    productsSubscription!: Subscription

    constructor(private productSrv: ProductService, private http: HttpClient) { }

    // private urlProducts: string = 'http://localhost:3001/products';

    ngOnInit(): void {
        this.productSrv.getProducts().subscribe((data) => {
            console.log(data);

            this.products = data.content;
        })
    }

    ngOnDestroy(){
        if (this.productsSubscription) this.productsSubscription.unsubscribe()
    }

}
