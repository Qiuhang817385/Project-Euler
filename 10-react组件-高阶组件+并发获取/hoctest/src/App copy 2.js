import React, { useEffect, useState } from 'react';
import PromisePool from 'es6-promise-pool';
function Kaikeba (props) {
  return <div>
    {/* stage是静态数据,name是动态获取的 */}
    {props.stage}-{props.name}
  </div>
}

const withKaikeba = Comp => {
  const name = '动态获取的'
  return props => <Comp {...props} name={name} />
}

const NewKaikeba = withKaikeba(Kaikeba);

function App () {
  const [imagesSrc, setSrc] = useState([]);

  const fetchImg = () => {
    return new Promise((resolve, reject) => {
      fetch('http://www.qiuhang.club:7300/mock/5e1c648a059ebf2c630e5369/example/getImage').then(res => res.json())
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
      // yield delayValue(count, 1000)
      let a = yield fetchImg()
      // a.then((v) => {
      //   console.log('v', v)
      // })
      // 有了promise对象, 可以将异步操作以同步的流程表达出来, 避免了层层嵌套的回调函数(俗称'回调地狱')
    }
  }
  const promiseIterator = generatePromises()
  const pool = new PromisePool(promiseIterator, 2)

  useEffect(() => {
    console.time('总共用时');
    // pool.start()
    //   .then(() => {
    //     console.log('Complete');
    //   }
    //   ).then(() => { console.timeEnd('总共用时'); })
    // 返回的是一个成功的promise对象
    let r = Promise.resolve();
    console.log('r', r);
    r.then(() => {
      console.log('then')
    }).catch(() => {
      console.log('err')
    })

  }, [])



  return (
    <>
      {
        imagesSrc.map((img, i) => <img src={img} key={i} alt={i} />)
      }
      {/* <img src={imagesSrc} alt="1" /> */}
      <NewKaikeba stage="React" />
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

