import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from '../../models/products';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products: any
    productsSubscription!: Subscription

    basket: any
    basketSubscription!: Subscription

    constructor(private productSrv: ProductService) { }

    selectedProduct: any;
    showModal: boolean = false;

    openModal(product: any) {
        this.selectedProduct = product;
        this.showModal = true;
        const modal = document.getElementById("defaultModal")

        if (modal) {
            modal.style.display = "block";
        }
    }

    closeModal() {
        this.showModal = false;
        this.selectedProduct = null;

        const modal = document.getElementById("defaultModal")

        if (modal) {
            modal.style.display = "none";
        }
    }

    addToBasket(product: IProduct) {
        product.quantity = 1
        let findItem

        if (this.basket.length > 0) {
            findItem = this.basket.find((item: { id: string; }) => item.id === product.id)

            if (findItem) { this.updateToBasket(findItem) }
            else this.postToBasket(product)
        } else this.postToBasket(product)
    }

    updateToBasket(product: IProduct) {
        product.quantity += 1;
        this.productSrv.updateProductToBasket(product).subscribe((data) => { });
    }

    postToBasket(product: IProduct) {
        this.productSrv.postProductToBasket(product).subscribe((data) => this.basket.push(data))
    }

    ngOnInit(): void {
        this.productSrv.getProducts().subscribe((data) => {
            this.products = data.content;
            console.log(data);
        })

        this.basketSubscription = this.productSrv.getProductsFromBasket().subscribe((data) => {
            this.basket = data
        })
    }

    ngOnDestroy() {
        if (this.productsSubscription) this.productsSubscription.unsubscribe()

        if (this.basketSubscription) this.basketSubscription.unsubscribe()
    }
}
