import React, { useEffect, useState } from 'react';
import PromisePool from 'es6-promise-pool';


function App () {
  const [imagesSrc, setSrc] = useState([]);

  const fetchImg = () => {
    return new Promise((resolve, reject) => {
      fetch('http://mock.shtodream.cn/mock/5e8ec238b9b0d45a938f5d7a/test/getImage').then(res => res.json())
        .then((res) => {
          console.log('res', res)
          // 直接在这里进行操作
          setSrc((pre) => {
            const oldPre = pre;
            return [...oldPre, res.image]
          })
          resolve(res);
        })
    })
  }
  const generatePromises = function* () {
    for (let count = 1; count <= 20; count++) {
      yield fetchImg()
    }
  }
  const promiseIterator = generatePromises()
  const pool = new PromisePool(promiseIterator, 2)

  useEffect(() => {
    console.time('总共用时');
    pool.start()
      .then(() => {
        console.log('Complete');
      }
      ).then(() => { console.timeEnd('总共用时'); })
    // 返回的是一个成功的promise对象
  }, [])

  return (
    <>
      {
        imagesSrc.map((img, i) => <img src={img} key={i} alt={i} />)
      }
    </>
  );
}

export default App;

/*

  var delayValue = function (value, time) {
    return new Promise(function (resolve, reject) {
      console.log('Resolving ' + value + ' in ' + time + ' ms')

      setTimeout(function () {
        console.log('模拟异步请求Resolving: ' + value)
        resolve(value)
      }, time)
    })
  }


  const loadImg = (src) => {
    let promise = new Promise((resolve, reject) => {
      let img = document.createElement('img');
      img.onload = () => { resolve(img) }
      img.onerror = () => { reject('图片加载失败') }
      img.src = src
    })
    return promise;
  }



    result = loadImg(src);
    result.then((img)=>{
      img.width

    })
*/

