let img1 
let joy

function preload() {
  img1 = loadImage('./assets/laDefense.jpg')
}

function setup() {
  let can = createCanvas(400, 400, WEBGL)
  joy = joyP5.initJoyP5(can)

// }
// function draw() {
  background(220)

  let t = millis()/10

  let xres = 4
  let yres = 4
  let rn = xres*yres
  let ws = Array(rn).fill(0).map((i, index) => index*10)
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

  let xedge = width/xres
  let yedge = width/yres

  translate(-width+xedge/2, -height+yedge/2)
  

  joy.rectangle({ 
    w: width/xres,
    h: height/yres,
    'stroke': 'black'
  })
  // .translate({x: 0, y: 0 + t % height})
  .repeat({
    n: xres,
    transform: (index) => joy.translate({x: xedge, y: 0}),
    fnkwargs: (index) => {
      // let colorString = `${map(index, 0, 12, 0, 255)}, 0, 0`
      
      return {
        // 'fill': randomColors[index],
        'texture': img1,
        // 'stroke': map(index, 0, 12, 0, 255)
      }
    }
  })
  .repeat({
    n: yres, 
    transform: (index) => joy.translate({x: 0, y: yedge}),
   
  })
  .show()

  translate(-width+xedge, -height+yedge)

  // joy.rectangle({ 
  //   w: width/xres,
  //   h: height/yres,
  //   'stroke': 'black'
  // })
  // .repeat({
  //   n: 10, 
  //   transform: joy.translate({x: xedge, y: 0})
  // })
  // .show()
  
}