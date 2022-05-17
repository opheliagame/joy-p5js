# joy.js

this library provides [joy](https://github.com/fossunited/joy), a tiny creative coding library, with [p5.js](http://p5js.org/) 

joy is a creative coding library that makes it easy for its' users to create shapes, combine them and apply transformations, both simple and higher order ones 

p5.js is also a creative coding library with a focus on making coding accessible and inclusive for artists, designers, educators, beginners, and anyone else! 

## Key motivations

these two libraries have distinct ways of thinking about graphics and this is why some tasks are simpler in p5.js and others in joy. as a simple example, creating a camera capture is quite simple with p5.js and applying a higher order transformation like `repeat` is much simpler with joy. this project is an attempt to combine the best of both of these worlds (miley cyrus ref for anyone who's a fan haha <3)

- currently joy does not support animating shapes. animation of shapes created using joy driven with p5js is exciting 
- p5.js also has a lot of support for camera, video and image. bringing this into joy is also exciting 

## API 

```js
shape = point({x: x, y: y})

shape = circle({x: x, y: y, r: r})

shape = rectangle({x: x, y: y, w: w, h: h})

shape = ellipse({x: x, y: y, w: w, h: h})

shape = line({x1: x1, y1: y1, x2: x2, y2: y2})

shape = circle().translate({x: x, y: y}).rotate({angle: 45})

shape = circle().translate({x: x, y: y}).rotate({angle: 45}).repeat({n: 12, transform: rotate({angle: 10})})

p.draw = function() {
  p.background(255);
  shape.transform({x: 10}).show(p)
}
```

## Examples

### Basic shapes

```js
c = circle()
c.show(sk)
```
![simple circle](./examples/images/simple-1.jpg)

```js
c = circle({x: 50, y: 50, r: 50})
c.show(sk)
```
![simple circle](./examples/images/simple-2.jpg)


```js
s1 = circle()
s2 = ellipse()
s3 = rectangle()
s4 = line()
s1.show(sk)
s2.show(sk)
s3.show(sk)
s4.show(sk)
```
![simple shapes](./examples/images/simple-3.jpg)


### Combining shapes

```js
function donut(x, y, r) {
    let c1 = circle({x: x, y: y, r: r})
    let c2 = circle({x: x, y: y, r: r/2})
    return c1.add(c2)
}   
d = donut(0, 0, 100)
d.show(sk)
```
![combination](./examples/images/combine.jpg)


### Transformations

```js
shape = circle({r: 50})
        .translate({x: 100, y: 0})
shape.show(sk)
```
![transform](./examples/images/transform-1.jpg)


```js
const SQRT2 = 1.414
let r1 = rectangle({w: 200, h: 200})
let r2 = r1.clone().rotate({angle: 45}).scale({x: 1/SQRT2, y: 1/SQRT2})  // clone call becomes necessary
r1.show(sk)
r2.show(sk)
```
![transform](./examples/images/transform-2.jpg)


### Higher order transformations

```js
c = circle({x: -100, y: 0, r: 50})
shape = c.repeat({n: 10, transform: translate({x: 10, y: 0})})
shape.show(sk)
```
![higher order transformation](./examples/images/higher-1.jpg)


```js
shape = line().repeat({n: 18, transform: rotate({angle: 10})})
shape.show(sk)
```
![higher order transformation](./examples/images/higher-2.jpg)


```js
shape = rectangle({w: 200, h: 200}).repeat({n: 18, transform: rotate({angle: 10})})
shape.show(sk)
```
![higher order transformation](./examples/images/higher-3.jpg)


```js
shape = rectangle({w: 300, h: 300}).repeat({n: 72, transform: rotate({angle: 360/72}).scale({x: 0.92, y: 0.92})})
shape.show(sk)
```
![higher order transformation](./examples/images/higher-4.jpg)

```js
c = circle({x: 100, y: 0, r: 50})
shape = c.repeat({n: 36*4, transform: rotate({angle: 10}).scale({x: 0.97, y: 0.97})})   // rotate happens opposite
shape.show(sk)
```
![higher order transformation](./examples/images/higher-5.jpg)


## TODO

- [ ] exception raising for line fn, and for others
- [ ] implement polygon fn
- [x] combining shapes 
- [x] piping transforms together without shape `rotate().scale()`
- [ ] exception handling becomes essential for editor 


## Refs

  - https://dev.to/adam_cyclones/oporator-overloading-in-javascript-292f
  - https://extendscript.docsforadobe.dev/extendscript-tools-features/operator-overloading.html
  - https://github.com/zenozeng/p5.js-svg
  - https://www.peterbe.com/plog/javascript-destructuring-like-python-kwargs-with-defaults
  - https://medium.com/@ian_grubb/function-piping-in-javascript-a125b0876a2b
  - https://www.keithcirkel.co.uk/