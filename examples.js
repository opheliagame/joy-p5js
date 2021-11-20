// Example 1
const sketch1 = new p5(getP5Instance(), document.querySelector('#row1 .sketch'))
sketch1.c = circle()
sketch1.draw = () => {
  drawGrid(sketch1)
  sketch1.c.show(sketch1)
}

// Example 2
const sketch2 = new p5(getP5Instance(), document.querySelector('#row2 .sketch')) 
sketch2.c1 = circle({x: -50, y: 0, r: 50})
sketch2.c2 = circle({x: 50, y: 0, r: 50})


// let c = circle()
// let r = rectangle()
// let shape = c.add(r)
sketch2.draw = () => {
  drawGrid(sketch2)
  sketch2.c1.show(sketch2)
  sketch2.c2.show(sketch2)
}

// Example 5
const sketch5 = new p5(getP5Instance(), document.querySelector('#row4 .sketch'))
function eye(outer, inner, theta) {
  let r = outer.radius
  let innern = inner.translate({x: outer.center.x, y: outer.center.y})
                    .rotate({angle: theta})
                    .translate({x: r/2})
  return outer.add(innern)
}

sketch5.draw = () => {
  drawGrid(sketch5)
  
  let theta = sketch5.millis()/10
  let e = eye(circle({x: 100, y: 100, r: 50}), circle({r: 25}), theta)
  let eyes = e.repeat({n: 4, transform: rotate({angle: 90})})
  
  eyes.show(sketch5)
}

// Example 6
const sketch6 = new p5(getP5Instance(), document.querySelector('#row5 .sketch'))
var n = 300;
var c = 20;
sketch6.draw = () => {
  drawGrid(sketch6)
  
  sketch6.rotate(n * 0.3);
  let theta = sketch6.millis()/10

  for (var i = 0; i < n; i++) {
    var a = i * 137.5;
    var r = c * sketch6.sqrt(i);
    var x = r * sketch6.cos(a);
    var y = r * sketch6.sin(a)
    // sketch6.fill(0);
    let e = eye(circle({x: x, y: y, r: 10}), circle({r: 5}), theta)
    e.show(sketch6)
    // circle({x: x, y: y, r: 2}).show(sketch6)
  }

}
