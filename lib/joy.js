var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
class Shape {
    constructor(
    // renderer: Drawable,
    tag, attrs = {}, kwargs = {}, children = []) {
        // Creates a new shape.
        // this.renderer = renderer
        this.tag = tag;
        this.attrs = attrs;
        this.kwargs = kwargs;
        this.transform = [];
        this.children = children;
    }
    clone() {
        let shape = new Shape(this.tag, this.attrs, [...this.children]);
        return shape;
    }
    add(shape) {
        this.children.push(shape);
        return this;
    }
    show(renderer) {
        // try {
        renderer['push']();
        this.transform.forEach(t => t.show(renderer));
        for (const [key, value] of Object.entries(this.kwargs)) {
            renderer[key](value);
        }
        renderer[this.tag](...Object.values(this.attrs));
        this.children.forEach(child => child.show(renderer));
        renderer['pop']();
        // } catch(error) {
        //   throw new Error('show call missing p5 instance name')
        // }
    }
    toString() {
        return `<${this.tag} ${this.attrs}>`;
    }
    // all transformation functions return a shape
    translate({ x = 0, y = 0 } = { x: 0, y: 0 }) {
        let transform = new Translate(x, y);
        this.transform.push(transform);
        return this;
    }
    rotate({ angle = 0 } = { angle: 0 }) {
        let transform = new Rotate(angle);
        this.transform.push(transform);
        return this;
    }
    scale({ x = 1, y = 1 } = { x: 1, y: 1 }) {
        let transform = new Scale(x, y);
        this.transform.push(transform);
        return this;
    }
    repeat({ n, transform }) {
        let c = this.clone();
        Array(n).fill(0).map((_, i) => {
            let t = new Repeat(i + 1, transform);
            let cn = c.clone();
            cn.transform.push(t);
            this.children.push(cn);
        });
        return this;
    }
}
export class Point extends Shape {
    constructor(x = 0, y = 0, kwargs = {}) {
        super("point", { x: x, y: y });
        this.x = x;
        this.y = y;
    }
    equals(p) {
        return p instanceof Point &&
            p.x === this.x &&
            p.y === this.y;
    }
    toString() {
        return `Point(${this.x}, ${this.y})`;
    }
}
export class Circle extends Shape {
    constructor(center = new Point(0, 0), radius = 100, style = {}) {
        super("circle", { cx: center.x, cy: center.y, d: radius * 2 }, style);
        this.center = center;
        this.radius = radius;
    }
}
export class Ellipse extends Shape {
    constructor(center = new Point(0, 0), width = 200, height = 100, style = {}) {
        super("ellipse", { x: center.x, y: center.y, w: width, h: height, d: 50 }, style);
        this.center = center;
        this.width = width;
        this.height = height;
    }
}
export class Rectangle extends Shape {
    constructor(center = new Point(0, 0), width = 200, height = 100, style = {}) {
        super("rect", { x: center.x, y: center.y, w: width, h: height }, style);
        this.center = center;
        this.width = width;
        this.height = height;
    }
}
export class Line extends Shape {
    constructor(start = new Point(-100, 0), end = new Point(100, 0), kwargs = {}) {
        super("line", { x1: start.x, y1: start.y, x2: end.x, y2: end.y });
        this.start = start;
        this.end = end;
    }
}
class Transformation {
    constructor(tag, attrs = {}, children = []) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
    }
    show(renderer) {
        renderer[this.tag](...Object.values(this.attrs));
        this.children.forEach(transform => {
            return transform.show(renderer);
        });
    }
    // piping transforms together
    // translate().rotate().scale()
    translate({ x = 0, y = 0 } = { x: 0, y: 0 }) {
        let transform = new Translate(x, y);
        this.children.push(transform);
        return this;
    }
    rotate({ angle = 0 } = { angle: 0 }) {
        let transform = new Rotate(angle);
        this.children.push(transform);
        return this;
    }
    scale({ x = 1, y = x } = { x: 1, y: 1 }) {
        let transform = new Scale(x, y);
        this.children.push(transform);
        return this;
    }
}
export class Translate extends Transformation {
    constructor(x = 0, y = 0) {
        super("translate", { x: x, y: y });
        this.x = x;
        this.y = y;
    }
}
export class Rotate extends Transformation {
    constructor(angle = 0) {
        super("rotate", { angle: -angle });
        this.angle = -angle;
    }
}
export class Scale extends Transformation {
    constructor(x = 1, y = 1) {
        super("scale", { x: x, y: y });
        this.x = x;
        this.y = y;
    }
}
export class Repeat extends Transformation {
    constructor(n, transform) {
        // transform should be of instance Transformation
        if (!(transform instanceof Transformation))
            return;
        let children = [];
        for (let i = 0; i < n; i++) {
            let p = new Transformation(transform.tag, transform.attrs);
            let c = transform.children.map(child => {
                return new Transformation(child.tag, child.attrs);
            });
            children = children.concat([p, ...c]);
        }
        super(transform.tag, transform.attrs, children);
    }
}
function point(_a = {}) {
    var { x = 0, y = 0 } = _a, kwargs = __rest(_a, ["x", "y"]);
    // Creates a Point with x and y coordinates.
    return new Point(x, y, kwargs);
}
function circle(_a = {}) {
    var { x = 0, y = 0, r = 100 } = _a, kwargs = __rest(_a, ["x", "y", "r"]);
    return new Circle(new Point(x = x, y = y), r, kwargs);
}
function rectangle(_a = {}) {
    var { x = 0, y = 0, w = 200, h = 100 } = _a, kwargs = __rest(_a, ["x", "y", "w", "h"]);
    return new Rectangle(new Point(x = x, y = y), w, h, kwargs);
}
function ellipse(_a = {}) {
    var { x = 0, y = 0, w = 200, h = 100 } = _a, kwargs = __rest(_a, ["x", "y", "w", "h"]);
    return new Ellipse(new Point(x = x, y = y), w, h, kwargs);
}
function line(_a = {}) {
    var { x1 = -100, y1 = 0, x2 = 100, y2 = 0 } = _a, kwargs = __rest(_a, ["x1", "y1", "x2", "y2"]);
    return new Line(new Point(x1, y1), new Point(x2, y2), kwargs);
}
function translate({ x = 0, y = 0 } = { x: 0, y: 0 }) {
    return new Translate(x, y);
}
function rotate({ angle = 0 } = { angle: 0 }) {
    return new Rotate(angle);
}
function scale({ x = 1, y = 1 } = { x: 1, y: 1 }) {
    return new Scale(x, y);
}
