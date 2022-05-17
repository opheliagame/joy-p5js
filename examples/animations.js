// 1 - rotating rectangle
c = rectangle()
rot = 0
sk.draw = function() {
    sk.background(255)
    c.rotate({angle: 1})
    rot += 1
    c.show(sk)
}

// 2 - eyes!
rect = rectangle({x: 0, y: 0, w: sk.width/2, h: sk.height/2, fill: 'black'})
outer = circle({x: 75, y: 75, r: 50, fill: 'white'}).repeat({n: 4, transform: rotate({angle: 90})})
sk.draw = function() {
    sk.background(255)
    t = sk.millis()/1000.0

    let mouse = { x: sk.mouseX-sk.width/2, y: sk.mouseY-sk.height/2 }
    let theta = sk.atan2(mouse.x, mouse.y)
    let xdiff = sk.sin(theta) * (50-20)
    let ydiff = sk.cos(theta) * (50-20)

    inner1 = circle({x:  75+xdiff, y:  75+ydiff, r: 20, fill: 'black'})
    inner2 = circle({x: -75+xdiff, y:  75+ydiff, r: 20, fill: 'black'})
    inner3 = circle({x:  75+xdiff, y: -75+ydiff, r: 20, fill: 'black'})
    inner4 = circle({x: -75+xdiff, y: -75+ydiff, r: 20, fill: 'black'})
  	
    rect.show(sk)
    outer.show(sk)
    inner1.show(sk)
    inner2.show(sk)
    inner3.show(sk)
    inner4.show(sk)
}


// 3 - fun with colors
function makeRing(r1, r2, c1, c2, rot) {
    return ellipse({x: 0, y: 0, w: r1, h: r1, 
                    fill: c1,
                    stroke: c1,
                })
            .add(
                ellipse({x: (r1-r2)/2, y: 0, w: r2, h: r2, 
                    fill: c2,
                    stroke: c2,
                })
                .rotate({angle: rot})
            )
}
let from = sk.color(163, 72, 219);
let to = sk.color(208, 153, 242);
sk.draw = function() {
    sk.background(to)
    sk.smooth()
    let r = 250
    t = sk.millis()/100.0

    let c1 = sk.lerpColor(from, to, Math.abs(Math.sin(t/100)))
    let c2 = sk.lerpColor(to, from, Math.abs(Math.sin(t/100)))

    while(r >= 25) {
        c = makeRing(r*2, (r-25)*2, c1.toString('#rrggbb'), c2.toString('#rrggbb'), t*10+r/2)
        r -= 50
        c.show(sk)
    }
}

// 4 - camera - color shapes with camera
let capture = sk.createCapture(sk.VIDEO)
capture.hide()
sk.draw = function() {
    
    sk.image(capture, -sk.width/2, -sk.height/2, sk.width, sk.height)
}

// 5 - 3d shapes