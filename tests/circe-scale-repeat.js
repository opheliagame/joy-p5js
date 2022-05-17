let joy 
let img1 

function preload() {
  img1 = loadImage('./assets/laDefense.jpg')
}

function setup() {
  let can = createCanvas(400, 400, WEBGL)
  joy = joyP5.initJoyP5()

}
function draw() {
  background(220)

  let t = millis()/100

  let randomColors = Array(12).fill(0).map(() => color(random(255), random(255), random(255)))

  texture(img1)

  // push()
  // translate(200, 200)
  // circle(0, 0, 100)
  // pop()

  // texture(img1)
  // circle(0, 0, 20)

  // circle(0, 20, 10)

  joy.circle({ 
    r: 150,
    'noFill': '',
    'stroke': 'black'
  })
  // .translate({x: width/2, y: height/2})
  .repeat({
    n: 12,
    transform: joy.scale({x: 0.92, y: 0.92}),
    fnkwargs: (index) => {
      
      return {
        'fill': 255,
        'texture': img1,
        // 'noFill': '',
        // 'fill': randomColors[index],
        // 'stroke': map(index, 0, 12, 0, 255)
      }
    }
  })
  .show()
  
}