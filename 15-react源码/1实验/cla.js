class Point {
  constructor(x, y) {
    // ...
  }

  toString () {
    // ...
  }
}

for (const key in Point.prototype) {
  console.log(key);
}