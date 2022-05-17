
function setup() {
  let can = createCanvas(400, 400)

// }
// function draw() {
  background(220)

  let joy = joyP5.initJoyP5(can)

  // example : Draw a circle
  // joy.circle()

  // example : Draw a circle at x, y
  joy.circle({x: 50, y: 50, r: 50}) 

  // example : Draw a circle, ellipse, rectangle and line
  // joy.circle()
  // joy.ellipse()
  // joy.rectangle()
  // joy.line()

  // Combining shapes
  // example : Draw a donut
  // function donut(x, y, r) {
  //   let c1 = joy.circle({x: x, y: y, r: r})
  //   let c2 = joy.circle({x: x, y: y, r: r/2})
  //   return c1.add(c2)
  // }   
  // donut(0, 0, 100)

  // Transformations
  // example : Translate by x, y
  // joy.circle({r: 100}).translate({x: 100, y: 0}).show()

  // example : Rotate by angle and scale by x, y
  // const SQRT2 = 1.414
  // let r1 = joy.rectangle({w: 200, h: 200})
  // let r2 = r1.clone().rotate({angle: 45}).scale({x: 1/SQRT2, y: 1/SQRT2})
  // r1.show()
  // r2.show()

  // Higher order transformations

  // example : Draw multiple circles in a line
  // let c = joy.circle({x: -100, y: 0, r: 50})
  // let shape = c.repeat({n: 10, transform: joy.translate({x: 10, y: 0})})
  // shape.show()

  // example : Draw lines branching out from the center
  // shape = joy.line().repeat({n: 18, transform: joy.rotate({angle: 10})})
  // shape.show()

  // example : Draw multiple rectangles rotated around their center
  // shape = joy.rectangle({w: 200, h: 200}).repeat({n: 18, transform: joy.rotate({angle: 10})})
  // shape.show()

  // shape = joy.rectangle({w: 200, h: 100}).repeat({n: 18, transform: joy.rotate({angle: 10})})
  // shape.show()
  
  // TODO find the correct formula for this
  // example : Draw multiple rectangles rotated and scaled around the center
  // shape = joy.rectangle({w: 300, h: 300}).repeat({n: 72, transform: joy.rotate({angle: 360/72}).scale({x: 0.92, y: 0.92})})
  // shape.show()


  // example : Draw multiple circles in a spiral from the center
  c = joy.circle({x: 100, y: 0, r: 50})
  shape = c.repeat({n: 36*4, transform: joy.rotate({angle: 10}).scale({x: 0.97, y: 0.97})})   // rotate happens opposite
  shape.show()
  
}