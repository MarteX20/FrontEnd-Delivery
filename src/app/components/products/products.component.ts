import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './products';
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

    ngOnInit(): void {
        this.productSrv.getProducts().subscribe((data) => {
            // console.log(data);
            this.products = data.content;
        })
    }

    ngOnDestroy() {
        if (this.productsSubscription) this.productsSubscription.unsubscribe()
    }

}
