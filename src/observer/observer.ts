export type Observer = (price: number) => void;

export type Subject = {
    register(o: Observer): void;
    unregister(o: Observer): void;
    notify(): void;
    setPrice(n: number): void;
    getPrice(): number;
};

export function createStock(): Subject {
    let observers: Observer[] = [];
    let price = 0;

    return {
        register(o: Observer) {
            if (!observers.includes(o)) observers.push(o);
        },
        unregister(o: Observer) {
            observers = observers.filter((x) => x !== o);
        },
        notify() {
            for (const o of observers) o(price);
        },
        setPrice(n: number) {
            price = n;
            for (const o of observers) o(price);
        },
        getPrice() {
            return price;
        },
    };
}


export function createPriceDisplay(sink: (line: string) => void): Observer {
    return (price: number) => sink(`📺 화면에 표시: 현재 주가 = ${price}`);
}

export function createPriceAlert(
    threshold: number,
    sink: (line: string) => void
): Observer {
    return (price: number) => {
        if (price > threshold) sink(`🚨 알림: 주가 ${price} (임계 ${threshold} 초과)`);
    };
}

export function createMovingAvg(
    windowSize: number,
    sink: (line: string) => void
): Observer {
    const window: number[] = [];
    return (price: number) => {
        window.push(price);
        if (window.length > windowSize) window.shift();
        const avg = Math.round(
            (window.reduce((a, b) => a + b, 0) / window.length) * 100
        ) / 100;
        sink(`📊 ${window.length}개 이동평균: ${avg}`);
    };
}