export type BaseShape = {
    kind: "circle" | "rect";
    x: number;
    y: number;
    color: string;
    clone(): Shape;
    area(): number;
    describe(): string;
};

export type Circle = BaseShape & {
    kind: "circle";
    radius: number;
};

export type Rect = BaseShape & {
    kind: "rect";
    width: number;
    height: number;
};

export type Shape = Circle | Rect;

export function createCirclePrototype(init?: Partial<Circle>): Circle {
    const base: Circle = {
        kind: "circle",
        x: init?.x ?? 0,
        y: init?.y ?? 0,
        color: init?.color ?? "#1e90ff",
        radius: init?.radius ?? 20,

        clone() {
            return createCirclePrototype({
                x: this.x,
                y: this.y,
                color: this.color,
                radius: this.radius,
            });
        },
        area() {
            return Math.PI * this.radius * this.radius;
        },
        describe() {
            return `● circle r=${this.radius} @(${this.x},${this.y}) ${this.color}`;
        },
    };
    return base;
}
export function createRectPrototype(init?: Partial<Rect>): Rect {
    const base: Rect = {
        kind: "rect",
        x: init?.x ?? 0,
        y: init?.y ?? 0,
        color: init?.color ?? "#ff7f50",
        width: init?.width ?? 40,
        height: init?.height ?? 24,

        clone() {
            return createRectPrototype({
                x: this.x,
                y: this.y,
                color: this.color,
                width: this.width,
                height: this.height,
            });
        },
        area() {
            return this.width * this.height;
        },
        describe() {
            return `■ rect ${this.width}x${this.height} @(${this.x},${this.y}) ${this.color}`;
        },
    };
    return base;
}

export type PrototypeKey = "circle.small" | "circle.big" | "rect.card" | "rect.banner";

const registry: Record<PrototypeKey, Shape> = {
    "circle.small": createCirclePrototype({ radius: 10, color: "#4caf50" }),
    "circle.big": createCirclePrototype({ radius: 40, color: "#673ab7" }),
    "rect.card": createRectPrototype({ width: 48, height: 32, color: "#ff9800" }),
    "rect.banner": createRectPrototype({ width: 120, height: 28, color: "#03a9f4" }),
};

export function listPrototypeKeys(): PrototypeKey[] {
    return Object.keys(registry) as PrototypeKey[];
}

export function createFromPrototype(key: PrototypeKey): Shape {
    return registry[key].clone();
}