import { Circle, Ellipse, Line, Point, Rectangle, Repeat, Rotate, Scale, Translate } from './joy';
declare class JoyP5 {
    renderer: Drawable;
    constructor(renderer?: Drawable);
    point({ x, y, ...kwargs }?: {
        x?: number;
        y?: number;
    }): Point;
    circle({ x, y, r, ...kwargs }?: {
        x?: number;
        y?: number;
        r?: number;
    }): Circle;
    rectangle({ x, y, w, h, ...kwargs }?: {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }): Rectangle;
    ellipse({ x, y, w, h, ...kwargs }?: {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    }): Ellipse;
    line({ x1, y1, x2, y2, ...kwargs }?: {
        x1?: number;
        y1?: number;
        x2?: number;
        y2?: number;
    }): Line;
    translate({ x, y }?: {
        x?: number;
        y?: number;
    }): Translate;
    rotate({ angle }?: {
        angle?: number;
    }): Rotate;
    scale({ x, y }?: {
        x?: number;
        y?: number;
    }): Scale;
    repeat({ n, transform, fnkwargs }: {
        n: any;
        transform: any;
        fnkwargs?: any;
    }): Repeat;
}
export declare abstract class Drawable {
    renderer: any;
    show(): void;
}
export declare function initJoyP5(): JoyP5;
export {};
