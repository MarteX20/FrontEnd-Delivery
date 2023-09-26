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

    deliveryCostInCents: number = 0
    basket: any
    basketSubscription!: Subscription

    ngOnInit(): void {
        this.ProductService.getProductsFromBasket().subscribe((data) => {
            this.basket = data

        })
    }

    ngOnDestroy() {
        if (this.basketSubscription) this.basketSubscription.unsubscribe()
    }

    minusItemBasket(item: IProduct) {
        if (item.quantity === 1) {
            this.ProductService.deleteProductFromBasket(item.id).subscribe(() => {
                let idx = this.basket.findIndex((data: IProduct) => data.id === item.id)
                this.basket.splice(idx, 1);
            });
        } else {
            item.quantity -= 1;
            this.ProductService.updateProductToBasket(item).subscribe((data) => {
            });
        }
    }

    calculateTotal(): number {
        let total = 0;
        for (const item of this.basket) {
            total += item.price * item.quantity;
        }

        const deliveryCostInEuro = this.deliveryCostInCents / 100

        total += deliveryCostInEuro
        return total;
    }

    plusItemBasket(item: IProduct) {
        item.quantity += 1;
        this.ProductService.updateProductToBasket(item).subscribe((data) => {
        });
    }

    clearBasket(){
        this.basket = [];
    }
}



// export enum DeliveryOption {
//     Delivery = 1,
//     Pickup = 2
// }

// selectedDeliveryOption: DeliveryOption
