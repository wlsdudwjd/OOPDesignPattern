export interface OldPaymentProcessor {
    pay(amount: number): void;
}

export class NewPaymentGateway {
    makePayment(value: number): void {
        console.log(`${value}원을 새 결제 게이트웨이로 처리함`);
    }
}

export function PaymentAdapter(gateway: NewPaymentGateway): OldPaymentProcessor {
    return {
        pay(amount: number) {
            gateway.makePayment(amount);
        }
    };
}

export function processPayment(processor: OldPaymentProcessor, amount: number) {
    processor.pay(amount);
}