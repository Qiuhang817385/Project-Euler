function asyncPool (pollLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function () {
    // 边界处理，array为空数组
    if (i === array.length) return Promise.resolve();
    // 每调一次enqueue，初始化一个promise
    const item = array[i++];
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    // 放入promises数组
    ret.push(p);
    // promise执行完毕，从executing数组中删除,e未完成的时候是promise <pending> 
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    // 插入executing数字，表示正在执行的promise
    // push之前,executing为空
    executing.push(e);
    // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
    let r = Promise.resolve();
    if (executing.length >= poolLimit) {
      // r也是一个promise,状态由后面的所决定
      r = Promise.race(executing);
    }
    // 递归，直到遍历完array
    return r.then(() => enqueue());
  }
  return enqueue().then(() => Promise.all(ret));
}