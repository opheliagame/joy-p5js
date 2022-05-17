// Basic shapes

c = circle()
c.show(sk)

c = circle({x: 50, y: 50, r: 50})
c.show(sk)

s1 = circle()
s2 = ellipse()
s3 = rectangle()
s4 = line()
s1.show(sk)
s2.show(sk)
s3.show(sk)
s4.show(sk)

// Combining shapes

function donut(x, y, r) {
    let c1 = circle({x: x, y: y, r: r})
    let c2 = circle({x: x, y: y, r: r/2})
    return c1.add(c2)
}   
d = donut(0, 0, 100)
d.show(sk)

// Transformations

shape = circle({r: 50})
        .translate({x: 100, y: 0})
shape.show(sk)

const SQRT2 = 1.414
let r1 = rectangle({w: 200, h: 200})
let r2 = r1.clone().rotate({angle: 45}).scale({x: 1/SQRT2, y: 1/SQRT2})  // clone call becomes necessary
r1.show(sk)
r2.show(sk)

// Higher order transformations

c = circle({x: -100, y: 0, r: 50})
shape = c.repeat({n: 10, transform: translate({x: 10, y: 0})})
shape.show(sk)

shape = line().repeat({n: 18, transform: rotate({angle: 10})})
shape.show(sk)

shape = rectangle({w: 200, h: 200}).repeat({n: 18, transform: rotate({angle: 10})})
shape.show(sk)

shape = rectangle({w: 200, h: 100}).repeat({n: 18, transform: rotate({angle: 10})})
shape.show(sk)

shape = rectangle({w: 300, h: 300}).repeat({n: 72, transform: rotate({angle: 360/72}).scale({x: 0.92, y: 0.92})})
shape.show(sk)

c = circle({x: 100, y: 0, r: 50})
shape = c.repeat({n: 36*4, transform: rotate({angle: 10}).scale({x: 0.97, y: 0.97})})   // rotate happens opposite
shape.show(sk)

