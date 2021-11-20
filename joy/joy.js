class Shape {
  /* Shape is the base class for all shapes in Joy.
  A Shape is an SVG node and supports converting itthis into svg text.
  Typically, users do not interact with this class directly, but use it
  through its subclasses. */
  
  // how to use **attrs
  constructor(
    tag,
    attrs = {},
    children = []
  ) {
    // Creates a new shape.
    this.tag = tag
    this.attrs = attrs
    this.transform = []
    this.children = children
  }

  clone() {
    let shape = new Shape(this.tag, this.attrs, [...this.children])
    return shape
  }

  add(shape) {
    this.children.push(shape)
    return this
  }

  show(p) {  
    p['push']()
    this.transform.forEach(t => t.show(p))
    p[this.tag](...Object.values(this.attrs))
    this.children.forEach(child => child.show(p))
    p['pop']()
  }

  toString() {
    return `<${this.tag} ${this.attrs}>`
  }

  // all transformation functions return a shape
  translate({
    x = 0, 
    y = 0
  }={x: 0, y: 0}) {
    let transform = new Translate(x, y)
    this.transform.push(transform)
    return this
  }

  rotate({
    angle = 0
  }={angle: 0}) {
    let transform = new Rotate(angle)
    this.transform.push(transform)
    return this
  }

  scale({
    x = 1, 
    y = 1
  }={x: 1, y: 1}) {
    let transform = new Scale(x, y)
    this.transform.push(transform)
    return this
  }

  repeat({
    n,
    transform
  }) {
    let c = this.clone()
    Array(n).fill(0).map((_, i) => {
      let t = new Repeat(i+1, transform)
      let cn = c.clone()
      cn.transform.push(t)
      this.children.push(cn)
    })
    return this
  }
}

class Point extends Shape {
  constructor(x, y) {
    super("point", {x: x, y: y})
    this.x = x
    this.y = y
  }

  equals(p) {
    return p instanceof Point && 
           p.x === this.x && 
           p.y === this.y
  }

  toString() {
    return `Point(${this.x}, ${this.y})`
  }
}

class Circle extends Shape {
  constructor(center=new Point(0, 0), radius=100, kwargs={}) {
    super("circle", {cx: center.x, cy: center.y, d: radius*2})
    this.center = center
    this.radius = radius
  }
}

class Ellipse extends Shape {
  constructor(center=new Point(0, 0), width=200, height=100, kwargs={}) {
    super("ellipse", {x: center.x, y: center.y, w: width, h: height})
    this.center = center
    this.width = width
    this.height = height
  }
}

class Rectangle extends Shape {
  constructor(center=new Point(0, 0), width=200, height=100, kwargs={}) {
    super("rect", {x: center.x, y: center.y, w: width, h: height})
    this.center = center
    this.width = width
    this.height = height
  }
}

class Line extends Shape {
  constructor(start=new Point(-100, 0), end=new Point(100, 0), kwargs={}) {
    super("line", {x1: start.x, y1: start.y, x2: end.x, y2: end.y})
    this.start = start
    this.end = end
  }
}

class Transformation {
  constructor(
    tag,
    attrs = {},
    children = []
  ) {
    this.tag = tag
    this.attrs = attrs
    this.children = children
  }

  show(p) {
    p[this.tag](...Object.values(this.attrs))
    this.children.forEach(transform => {
      return transform.show(p)
    })
  }

  // piping transforms together
  // translate().rotate().scale()
  translate({
    x = 0, 
    y = 0
  }={x: 0, y: 0}) {
    let transform = new Translate(x, y)
    this.children.push(transform)
    return this
  }

  rotate({
    angle = 0
  }={angle: 0}) {
    let transform = new Rotate(angle)
    this.children.push(transform)
    return this
  }

  scale({
    x = 1, 
    y = x
  }={x: 1, y: 1}) {
    let transform = new Scale(x, y)
    this.children.push(transform)
    return this
  }

}

class Translate extends Transformation {
  constructor(x=0, y=0) {
    super("translate", {x: x, y: y})
    this.x = x
    this.y = y
  }
}

class Rotate extends Transformation {
  constructor(angle=0) {
    super("rotate", {angle: -angle})
    this.angle = -angle
  }
}

class Scale extends Transformation {
  constructor(x=1, y=1) {
    super("scale", {x: x, y: y})
    this.x = x
    this.y = y
  }
}

class Repeat extends Transformation {
  constructor(n, transform) {
    // transform should be of instance Transformation
    if (!(transform instanceof Transformation)) return
    let children = []
    for(let i = 0; i < n; i++) {
      let p = new Transformation(transform.tag, transform.attrs)
      let c = transform.children.map(child => {
        return new Transformation(child.tag, child.attrs)
      })
      children = children.concat([p, ...c]) 
    }
    super(transform.tag, transform.attrs, children)
  }
}

function point({
  x, 
  y
}={}) {
  // Creates a Point with x and y coordinates.
  return new Point(x, y)
}

function circle({
  x = 0, 
  y = 0,
  r = 100, 
  ...kwargs
}={}) {
  return new Circle(new Point(x=x, y=y), r, kwargs)
}

function rectangle({
  x = 0, 
  y = 0,
  w = 200,
  h = 100,
  ...kwargs
}={}) {
  return new Rectangle(new Point(x=x, y=y), w, h, kwargs)
}

function ellipse({
  x = 0, 
  y = 0,
  w = 200,
  h = 100,
  ...kwargs
}={}) {
  return new Ellipse(new Point(x=x, y=y), w, h, kwargs)
}

function line({
  x1 = -100, 
  y1 = 0,
  x2 = 100,
  y2 = 0,
  ...kwargs
}={}) {
  return new Line(new Point(x=x1, y=y1), new Point(x=x2, y=y2), kwargs)
}

function translate({
  x = 0,
  y = 0
}={x: 0, y: 0}) {
  return new Translate(x, y)
}

function rotate({
  angle = 0
}={angle: 0}) {
  return new Rotate(angle)
}

function scale({
  x = 1, 
  y = 1
}={x: 1, y: 1}) {
  return new Scale(x, y)
}