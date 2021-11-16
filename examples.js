const getP5Instance = () => {
  const s = p => {
    p.setup = function() {
      if(mobileCheck() === true) {
        p.createCanvas(350, 350)
      } else {
        p.createCanvas(500, 500);
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
  for(let i = 0; i < p.width; i+=50) {
    p.line(i, 0, i, p.height)
  }
  for(let i = 0; i < p.height; i+=50) {
    p.line(0, i, p.width, i)
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

// Example 3
// const sketch3 = new p5(getP5Instance())
// sketch3.r = rectangle({x: 0, y: 0, w: 300, h: 300})
// sketch3.worli = () => {
//   let z = line({x1:0,y1:0,x2:-50,y2:50})
//           .add(line({x1:0,y1:0,x2:50,y2:50}))
//           .add(line({x1:-50,y1:50,x2:50,y2:50})) 
//   let z1 = z.rotate({angle: 180})
//   let c = circle({x: 0, y: 100, r: 40})
//   let z2 = line({x1: 50, y1: 50, x2: 100, y2: 0, stroke_width: 5}) 
//            .add(line({x1: 100, y1: 0, x2: 150, y2: 50, stroke_width:5}))
//   let z3 = z2.rotate({angle: 270})
//   let z4 = line({x1: -50,y1: 50,x2: -100,y2: 0, stroke_width: 5}) 
//            .add(line({x1: -100,y1: 0,x2:-150,y2: 50, stroke_width: 5}))
//   return z
// }  
// sketch3.w = sketch3.worli()
// // console.log(sketch3.w)
//                    .scale({x: 0.30, y: 0.30})
//                    .rotate({angle: 90})
//                    .translate({x: 100})
//                    .repeat({n: 12, tranform: rotate({angle: 30})})
// sketch3.draw = () => {
//   drawGrid(sketch3)
//   sketch3.r.show(sketch3)
//   sketch3.w.show(sketch3)
// }

// Example 4
const sketch4 = new p5(getP5Instance(), document.querySelector('#row3 .sketch'))
sketch4.draw = () => {
  drawGrid(sketch4)
  let t = sketch4.millis()/100

  sketch4.shape = ellipse({x: 50, y: 0, w: 200*sketch4.abs(sketch4.sin(t)), h: 100*sketch4.abs(sketch4.sin(t))})
                  .repeat({n: 72, transform: rotate({angle: 10}).scale({x: 0.95})})
  sketch4.shape.show(sketch4)
}

// Example 5
// t = rotate({angle: 10}).scale({x: 0.97, y: 0.97})
// shape = circle({x: 100, r: 50}).repeat({n: 200, transform: t})

