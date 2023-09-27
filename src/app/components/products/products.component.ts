import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from '../../models/products';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    @ViewChild('toastElement') toastElement: ElementRef | undefined;
    products: any
    productsSubscription!: Subscription

    basket: any
    basketSubscription!: Subscription

    constructor(private productSrv: ProductService, public authSrv: AuthService) { }

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

    getBasket(): any[] {
        const basket = localStorage.getItem("basket");
        return basket? JSON.parse(basket):[]
    }

    setBasket(basket: any[]){
        localStorage.setItem("basket", JSON.stringify(basket))
    }

    addBasket(ogg: any){
        ogg.quantity = 1
        const basket = this.getBasket()
        basket.push(ogg)
        this.setBasket(basket)

        //Mostro il toast al click
        if (this.toastElement) {
            this.toastElement.nativeElement.style.display = 'flex'

            //Il toast sparisce dopo 3 secondi qui
            setTimeout(() => {
                if (this.toastElement) {
                    this.toastElement.nativeElement.style.display = 'none'
                }
            }, 3000)
        }
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
