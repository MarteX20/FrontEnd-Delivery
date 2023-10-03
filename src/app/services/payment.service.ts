import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    totalAmount: number = 0
    transactionID = ""

    constructor() { }
    private totalAmountSubject = new BehaviorSubject<number>(0)
    totalAmount$ = this.totalAmountSubject.asObservable()

    updateTotalAmount(amount: number) {
        this.totalAmount = amount
        this.totalAmountSubject.next(amount)
    }
}

