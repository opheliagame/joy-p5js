import { Drawable } from "./index";
declare class Shape {
    tag: string;
    attrs: any;
    kwargs: any;
    transform: Transformation[];
    children: Shape[];
    constructor(tag: string, attrs?: {}, kwargs?: {}, children?: any[]);
    clone(newKwargs?: {}): Shape;
    add(shape: Shape): this;
    show(r?: Drawable): void;
    toString(): string;
    translate({ x, y }?: {
        x?: number;
        y?: number;
    }): this;
    rotate({ angle }?: {
        angle?: number;
    }): this;
    scale({ x, y }?: {
        x?: number;
        y?: number;
    }): this;
    repeat({ n, transform, fnkwargs }: {
        n: number;
        transform: Transformation | ((index: number) => Transformation);
        fnkwargs?: (index: number) => any;
    }): this;
}
export declare class Point extends Shape {
    x: number;
    y: number;
    constructor(x?: number, y?: number, kwargs?: {});
    equals(p: Point): boolean;
    toString(): string;
}
export declare class Circle extends Shape {
    center: Point;
    radius: number;
    constructor(center?: Point, radius?: number, style?: {});
}
export declare class Ellipse extends Shape {
    center: Point;
    width: number;
    height: number;
    constructor(center?: Point, width?: number, height?: number, style?: {});
}
export declare class Rectangle extends Shape {
    center: Point;
    width: number;
    height: number;
    constructor(center?: Point, width?: number, height?: number, style?: {});
}
export declare class Line extends Shape {
    start: Point;
    end: Point;
    constructor(start?: Point, end?: Point, kwargs?: {});
}
declare class Transformation {
    tag: string;
    attrs: any;
    children: Transformation[];
    constructor(tag: any, attrs?: {}, children?: any[]);
    show(): void;
    translate({ x, y }?: {
        x?: number;
        y?: number;
    }): this;
    rotate({ angle }?: {
        angle?: number;
    }): this;
    scale({ x, y }?: {
        x?: number;
        y?: number;
    }): this;
}
export declare class Translate extends Transformation {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
}
export declare class Rotate extends Transformation {
    angle: number;
    constructor(angle?: number);
}
export declare class Scale extends Transformation {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
}
export declare class Repeat extends Transformation {
    constructor(n: any, transform: any);
}
export {};
