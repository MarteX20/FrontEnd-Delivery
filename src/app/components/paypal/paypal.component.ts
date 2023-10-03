import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-paypal',
    templateUrl: './paypal.component.html',
    styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

    totalAmount!: number

    @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

    constructor(private router: Router, private payment: PaymentService) { }

    ngOnInit(): void {
        this.totalAmount = this.payment.totalAmount;

        this.totalAmount = this.payment.totalAmount;
        window.paypal.Buttons(
            {
                style: {
                    layout: 'horizontal',
                    color: 'blue',
                    label: 'paypal',

                    tagline: false
                },
                createOrder: (data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: this.totalAmount.toString(),
                                    currency_code: 'EUR'
                                }
                            }
                        ]
                    });
                },
                onApprove: (data: any, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                        if (details.status === 'COMPLETED') {
                            this.payment.transactionID = details.id;
                            console.log(details);
                            this.router.navigate(['confirmPaypal'], { queryParams: { details: JSON.stringify(details) } });
                        }
                    });
                },
                onError: (error: any) => {
                    console.log(error);
                }
            }
        ).render(this.paymentRef.nativeElement);

    }
    cancel() {
        this.router.navigate(['products']);
    }
}
