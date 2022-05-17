let img1
let joy

function preload() {
  img1 = loadImage('./assets/gradient.jpg')
}

function setup() {
  let can = createCanvas(400, 400, WEBGL)
  joy = joyP5.initJoyP5(can)

  // }
  // function draw() {
  background('whitesmoke')

  let t = millis() / 10

  let xres = 4
  let yres = 4
  let rn = xres * yres
  let ws = Array(rn).fill(0).map((i, index) => index * 10)
  // console.log(ws)
  let randomColors = Array(rn).fill(0).map(() => color(random(255), random(255), random(255)))

  // joy.rectangle({ 
  //   w: 20,
  //   h: 20,
  //   'noFill': '',
  //   'stroke': 'black'
  // })
  // .translate({x: -width/2, y: -height/2+20/2})
  // .repeat({
  //   n: xres,
  //   transform: (index) => joy.repeat({
  //     n: yres,
  //     transform: (index) => joy.translate({x: 20, y: floor(index/8)*20}),

  //   }),
  //   fnkwargs: (index) => {
  //     // let colorString = `${map(index, 0, 12, 0, 255)}, 0, 0`

  //     return {
  //       'fill': randomColors[index],
  //       'texture': img1,
  //       // 'stroke': map(index, 0, 12, 0, 255)
  //     }
  //   }
  // })
  // .show()

  texture(img1)
  noStroke()

  let xedge = width / xres
  let yedge = width / yres
  translate(-width / 2, -height / 2)

  let w = 100
  let h = 100
  let nrotations = 20

  joy.rectangle({ w: w /* 100 */, h: h /* 100 */})
  .repeat({ 
    n: nrotations /* 20 */, 
    transform: (index) => {
      let angle = 360/(nrotations*4)
      let neww = w * cos(angle) + h * sin(angle)
      let newh = w * sin(angle) + h * cos(angle)
      let a = max(1, min(w/neww, h/newh))

      let sx = a*neww/w
      let sy = a*newh/h

      return joy.rotate({ angle: angle }).scale({x: sx, y: sy})
    } 
  })
  .show()

}