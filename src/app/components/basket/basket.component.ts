import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/products';
import { ProductService } from '../products/product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
    constructor(private ProductService: ProductService) { }

    basket:  any
    basketSubscription!: Subscription

    ngOnInit(): void {
        this.ProductService.getProductsFromBasket().subscribe( (data) => {
            this.basket = data
            console.log(data);
        })
    }

    ngOnDestroy(){
        if (this.basketSubscription) this.basketSubscription.unsubscribe()
    }

    minusItemBasket(item: IProduct) {
        if (item.quantity === 1) {
            this.ProductService.deleteProductFromBasket(item.id).subscribe(() => {
                let idx = this.basket.findIndex((data) => data.id === item.id);
                this.basket.splice(idx, 1);
            });
        } else {
            item.quantity -= 1;
            this.ProductService.updateProductToBasket(item).subscribe((data) => {
            });
        }
    }

    plusItemBasket(item: IProduct) {
        item.quantity += 1;
        this.ProductService.updateProductToBasket(item).subscribe((data) => {
        });
    }
}
