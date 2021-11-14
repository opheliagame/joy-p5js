// p = point({x: 10, y: 10})
// c = circle({x: 200, y: 400, r: 100})
// r = rectangle({x: 100, y: 100})
// e = ellipse()
// l = line({x1: 0, y1: 200, x1: 200, y: 400})
// show(p, c, r, e, l)

function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}


// sketch.draw = function() {
//   sketch.background(255)
//   sketch.strokeWeight(0.5)
//   for(let i = 0; i < sketch.width; i+=50) {
//     sketch.line(i, 0, i, sketch.height)
//   }
//   for(let i = 0; i < sketch.height; i+=50) {
//     sketch.line(0, i, sketch.width, i)
//   }
//   sketch.strokeWeight(1)
// }


// Example 1
t = rotate({angle: 10}).scale({x: 0.99, y: 0.99})
console.log(t)
shape = circle({x: 100, r: 50}).repeat({n: 200, transform: t})
show(shape)
shape.show(sketch)

// Example 2
