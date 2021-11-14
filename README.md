# joy.js

this library provides [joy](https://github.com/fossunited/joy), a tiny creative coding library, with [p5.js](http://p5js.org/) 

## API 

```js
shape = point({x: x, y: y})

shape = circle({x: x, y: y, r: r})

shape = rectangle({x: x, y: y, w: w, h: h})

shape = ellipse({x: x, y: y, w: w, h: h})

shape = line({x1: x1, y1: y1, x2: x2, y2: y2})

shape = circle().translate({x: x, y: y}).rotate({angle: 45})

show(shape)
```

## TODO

- [ ] exception raising for line fn
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
