const obj = {
  q: 'q',
  w: 'w',
  r: 'r'
}
const { q, ...rest } = obj;

console.log('rest', rest);
// rest { w: 'w', r: 'r' }