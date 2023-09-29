import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild('toastElement1') toastElement1: ElementRef | undefined;
    deliveryCostInCents: number = 0
    basket: any
    basketSubscription!: Subscription
    isDeliverySelected: boolean = false
    isPickupSelected: boolean = false

    ngOnInit(): void {

        const savedBasket = localStorage.getItem('basket')

        if (savedBasket) {
            this.basket = JSON.parse(savedBasket)

        } else {
            this.basket = []
        }
    }

    ngOnDestroy() {
        if (this.basketSubscription) this.basketSubscription.unsubscribe()
    }

    minusItemBasket(item: IProduct) {
        if (item.quantity === 1) {
            const idx = this.basket.findIndex((data: IProduct) => data.id === item.id);
            if (idx !== -1) {
                this.basket.splice(idx, 1);
            }
        } else {
            item.quantity -= 1;
        }
        localStorage.setItem('basket', JSON.stringify(this.basket));
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
    }

    clearBasket() {
        localStorage.removeItem('basket')
        this.basket = [];
        //Mostro il toast al click
        if (this.toastElement1) {
            this.toastElement1.nativeElement.style.display = 'flex'

            //Il toast sparisce dopo 3 secondi qui
            setTimeout(() => {
                if (this.toastElement1) {
                    this.toastElement1.nativeElement.style.display = 'none'
                }
            }, 3000)
        }
    }
}
