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

show(shape)

p.draw = function() {
  p.background(255);
  flower.transform({x: 10}).show(p)
}
```

## TODO

- [ ] exception raising for line fn, and for others
- [ ] implement polygon fn
- [ ] combining shapes 
- [ ] piping transforms together without shape `rotate().scale()`


## Refs

  - https://dev.to/adam_cyclones/oporator-overloading-in-javascript-292f
  - https://extendscript.docsforadobe.dev/extendscript-tools-features/operator-overloading.html
  - https://github.com/zenozeng/p5.js-svg
  - https://www.peterbe.com/plog/javascript-destructuring-like-python-kwargs-with-defaults
  - https://medium.com/@ian_grubb/function-piping-in-javascript-a125b0876a2b
  - https://www.keithcirkel.co.uk/

## video
[youtube](https://www.youtube.com/watch?v=BxoHK7yFapI)