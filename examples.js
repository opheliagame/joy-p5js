const getP5Instance = () => {
  const s = p => {
    p.setup = function() {
      if(mobileCheck() === true) {
        p.createCanvas(300, 300, p.WEBGL)
      } else {
        p.createCanvas(500, 500, p.WEBGL);
      }

      // defaults to go with Joy
      p.noFill()
      p.rectMode(p.CENTER)
      p.angleMode(p.DEGREES)
    };
  };
  return s
}

const drawGrid = (p) => {
  p.background(255)
  p.strokeWeight(0.5)
  for(let i = -p.width/2; i <= p.width/2; i+=50) {
    p.line(i, -p.height/2, i, p.height/2)
  }
  for(let i = -p.height/2; i <= p.height/2; i+=50) {
    p.line(-p.width/2, i, p.width/2, i)
  }
  p.strokeWeight(1)
}

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
