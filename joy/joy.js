function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

const SQRT2 = 2**0.5
const ASCII_LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const ID_SUFFIX = Array(4).fill(0).map(() => randomChoice(ASCII_LETTERS+DIGITS)).join('')

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
function shapeSequenceIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;
  
  const rangeIterator = {
    next: function() {
      let result;
      let nextSeq = `s-${nextIndex}-${ID_SUFFIX}`
      if (nextIndex < end) {
          result = { value: nextSeq, done: false }
          nextIndex += step;
          iterationCount++;
          return result;
      }
      return { value: iterationCount, done: true }
    }
  };
  return rangeIterator;
}

let shapeSequence = shapeSequenceIterator()

class Shape {
  /* Shape is the base class for all shapes in Joy.
  A Shape is an SVG node and supports converting itthis into svg text.
  Typically, users do not interact with this class directly, but use it
  through its subclasses. */
  
  // how to use **attrs
  constructor(
    tag,
    attrs = {},
    children = null
  ) {
    // Creates a new shape.
    this.tag = tag
    this.attrs = attrs
    this.transform = []
    this.children = []
  }

  get_reference() {
    if (!('id' in this.attrs)) {
      this.attrs.id = shapeSequence.next()
    }

    attrs = {"xlink:href": "#" + this.id}
    return Shape("use", attrs)
  }

  apply_transform(transform) {

  }

  clone() {
    let shape = new Shape(this.tag, this.attrs)
    return shape
  }

  get_attrs() {
    attrs = this.attrs
    if (this.transform) { attrs.transform = this.transform.toString() }
    return attrs
  }

  as_dict() {
    d = this.get_attrs()
    d.tag = this.tag
    if (this.children) {
      d.children = this.children.map(n => n.as_dict())
    }
    return d
  }

  show(p) {
    let blocks = []
    
    if(this.children.length == 0) {

      let transform = this.transform.map(t => t.show(p))
      let shapeFn = `${this.tag}(${Object.values(this.attrs).join(', ')})` 
      let pushFn = `push()`
      let initialTransfom = `translate(sketch.width/2, sketch.height/2)`
      let popFn = `pop()`
      let block = [pushFn, initialTransfom, ...transform, shapeFn, popFn].join('\n')
      blocks = blocks.concat(block)
    }
    else {
      this.children.forEach(child => {
        let transform = child.transform.map(t => t.show(p))
        let shapeFn = `${child.tag}(${Object.values(child.attrs).join(', ')})` 
        let pushFn = `push()`
        let initialTransfom = `translate(sketch.width/2, sketch.height/2)`
        let popFn = `pop()`
        let block = [pushFn, initialTransfom, ...transform, shapeFn, popFn].join('\n')
        // console.log(block)
        blocks = blocks.concat(block)
      })
    }
    
    blocks = blocks.join('\n')
    // console.log(blocks)
    return blocks
    
  }

  toString() {
    return `<${this.tag} ${this.attrs}>`
  }

  // all transformation fns return a shape
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
    Array(n).fill(0).map((_, i) => {
      let t = new Repeat(i+1, transform)
      let c = this.clone()
      c.transform.push(t)
      this.children.push(c)
    })
    // console.log(this)
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
    super("circle", {cx: center.x, cy: center.y, r:radius})
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
    if (this.children.length === 0) {
      // console.log(window['p'])
      // console.log(window['p'][this.tag](`${Object.values(this.attrs).join(', ')}`))
      return `${this.tag}(${Object.values(this.attrs).join(', ')})`
    }
    // else {
    //   let parentTransform = `${this.tag}(${Object.values(this.attrs).join(', ')})`
    //   let transforms = this.children.map(transform => {
    //     console.log(transform)
    //     return `${transform.tag}(${Object.values(transform.attrs).join(', ')})`
    //   })
    //   console.log([parentTransform].concat(transforms))
    //   return [parentTransform].concat(transforms).join('\n')
    // }
    else {
      return this.children.map(transform => {
        // console.log(transform)
        return transform.show()
      }).join('\n')
      // return [`${this.tag}(${Object.values(this.attrs).join(', ')})`].concat(this.children.map(transform => {
      //   console.log(transform)
      //   return transform.show()
      // })).join('\n')
    }
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
    y = 1
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
    // console.log(childre)
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
  /* Creates a circle with center at (x, y) and radius of r.
    Examples:
    Draw a circle.
        c = circle()
        show(c)
    Draw a circle with radius 50.
        c = circle(r=50)
        show(c)
    Draw a circle with center at (10, 20) and a radius of 50.
        c = circle(x=10, y=20, r=50)
        show(c) */

  return new Circle(new Point(x=x, y=y), r*2, kwargs)
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


let drawFn = [
  'sketch.background(255)'
]

let base = 
`
sketch.strokeWeight(0.5)
for(let i = 0; i < sketch.width; i+=50) {
  sketch.line(i, 0, i, sketch.height)
}
for(let i = 0; i < sketch.height; i+=50) {
  sketch.line(0, i, sketch.width, i)
}
sketch.strokeWeight(1)
`
drawFn = drawFn.concat(base.split('\n'))

function show(...shapes) {
  let commands = shapes.map(s => {
    let sFn = s.show().split('\n')
    sFn = sFn.map(fn => `sketch.${fn}`)
    drawFn = drawFn.concat(sFn)
    return sFn
  })
  // drawFn = drawFn.concat(commands)
  console.log(drawFn.join('\n'))

  sketch.draw = new Function(drawFn.join('\n'))
}

