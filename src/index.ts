import * as p5 from "p5";
import { Circle, Ellipse, Line, Point, Rectangle, Repeat, Rotate, Scale, Translate } from './joy'

class JoyP5 {
  renderer: Drawable

  constructor(renderer?: Drawable) {
    this.renderer = renderer

    
  }

  point({
    x = 0, 
    y = 0,
    ...kwargs
  }={}) {
    // Creates a Point with x and y coordinates.
    let drawable = new Point(x, y, kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  circle({
    x = 0, 
    y = 0,
    r = 100, 
    ...kwargs
  }={}) {
    let drawable = new Circle(new Point(x=x, y=y), r, kwargs)
    // TODO : possibly remove show in constructor because it stops chaining 
    // drawable.show(this.renderer)
    return drawable
  }
  
  rectangle({
    x = 0, 
    y = 0,
    w = 200,
    h = 100,
    ...kwargs
  }={}) {
    let drawable = new Rectangle(new Point(x=x, y=y), w, h, kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  ellipse({
    x = 0, 
    y = 0,
    w = 200,
    h = 100,
    ...kwargs
  }={}) {
    let drawable = new Ellipse(new Point(x=x, y=y), w, h, kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  line({
    x1 = -100, 
    y1 = 0,
    x2 = 100,
    y2 = 0,
    ...kwargs
  }={}) {
    let drawable = new Line(new Point(x1, y1), new Point(x2, y2), kwargs)
    // drawable.show(this.renderer)
    return drawable
  }
  
  translate({
    x = 0,
    y = 0
  }={x: 0, y: 0}) {
    let drawable = new Translate(x, y)
    // drawable.show()
    return drawable
  }
  
  rotate({
    angle = 0
  }={angle: 0}) {
    let drawable = new Rotate(angle)
    // drawable.show()
    return drawable
  }
  
  scale({
    x = 1, 
    y = 1
  }={x: 1, y: 1}) {
    let drawable = new Scale(x, y)
    // drawable.show()
    return drawable
  }

  repeat({
    n,
    transform,
    fnkwargs = null
  }) {
    let drawable = new Repeat(n, transform)
    return drawable
  }

}


export abstract class Drawable {
  renderer: any
  
  show() {}
}

class P5Renderer implements Drawable {
  renderer: p5.Renderer;

  constructor(renderer: p5.Renderer) {
    this.renderer = renderer
  }

  show(): void {
    
  }

}


export function initJoyP5(): JoyP5 {
  // let renderer = new P5Renderer(p5)

  // init process
  let renderer1 = (window.self as any) as p5 
  renderer1.translate(renderer1.width/2, renderer1.height/2)

  // make rectMode CENTER
  renderer1.rectMode(renderer1.CENTER)

  // make angleMode DEGREES
  renderer1.angleMode(renderer1.DEGREES)


  let joyP5 = new JoyP5()
  return joyP5

}
