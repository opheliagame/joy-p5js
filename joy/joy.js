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
  constructor(tag, attrs={}, children=null) {
    // Creates a new shape.
    this.tag = tag
    this.children = children
    this.attrs = attrs
    this.transform = null
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

  show() {
    let comm = `${this.tag}(${Object.values(this.attrs).join(', ')})` 
    return comm
  }
}

Shape.prototype.toString = () => {
  return `<${this.tag} ${this.attrs}>`
}


class Point extends Shape {
  /* Creates a new Point.
  Point represents a point in the coordinate space and it contains
  attributes x and y.
      >>> p = Point(x=100, y=50)
   */

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

  // show() {
  //   return `point(${this.x}, ${this.y})`
  // }
}
Point.prototype.toString = () => {
  return `Point(${this.x}, ${this.y})`
}

class Circle extends Shape {
  /* Creates a circle shape.
    Parameters:
        center:
            The center point of the circle.
            Defaults to Point(0, 0) when not specified.
        radius:
            The radius of the circle.
            Defaults to 100 when not specified.
    Examples:
    Draw a circle.
        >>> c = Circle()
        >>> show(c)
    Draw a Circle with radius 50.
        >>> c = Circle(radius=50)
        >>> show(c)
    Draw a circle with center at (100, 100) and radius as 50.
        >>> c = Circle(center=Point(x=100, y=100), radius=50)
        >>> show(c)
    When no arguments are specified, it uses (0, 0) as the center and
    100 as the radius. */
    
  constructor(center=new Point(0, 0), radius=100, kwargs={}) {
    super("circle", {cx: center.x, cy: center.y, r:radius})
    this.center = center
    this.radius = radius
  }

  // show() {
  //   return `circle(${this.x, this.y, this.radius})`
  // }
}

class Ellipse extends Shape {

}

function point(x, y) {
  // Creates a Point with x and y coordinates.
  return new Point(x, y)
}

function circle(x=0, y=0, r=100, kwargs={}) {
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

  return new Circle(center=new Point(x=x, y=y), radius=r, kwargs)
}

function show(...shapes) {
  let drawFn = ['sketch.background(220)']
  let commands = shapes.map(s => `sketch.${s.show()}`)
  drawFn = drawFn.concat(commands).join('\n')
  console.log(drawFn)

  sketch.draw = new Function(drawFn)
}