import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from '../../models/products';
import { Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products: any
    productsSubscription!: Subscription

    constructor(private productSrv: ProductService) { }

    selectedProduct: any;
    showModal: boolean = false;

    openModal(product: any){
        this.selectedProduct = product;
        this.showModal = true;
        const modal = document.getElementById("defaultModal")

        if(modal) {
            modal.style.display = "block";
        }
    }

    closeModal(){
        this.showModal = false;
        this.selectedProduct = null;

        const modal = document.getElementById("defaultModal")

        if (modal) {
            modal.style.display = "none";
        }
    }

    addToBasket(product: IProduct) {
        this.productSrv.postProductToBasket(product).subscribe((data) => console.log(product));
    }

    ngOnInit(): void {
        this.productSrv.getProducts().subscribe((data) => {
            this.products = data.content;
            console.log(data);

        })
    }

    ngOnDestroy() {
        if (this.productsSubscription) this.productsSubscription.unsubscribe()
    }
}
