var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function () {
  // ...
};

Object.keys(Point.prototype)

for (const key of Point.prototype) {
  console.log('执行了')
  console.log(key)
  // if (Point.hasOwnProperty(key)) {
  //   const element = Point[key];
  //   console.log(element)
  // }
}
// ["toString"]
// ["constructor","toString"]