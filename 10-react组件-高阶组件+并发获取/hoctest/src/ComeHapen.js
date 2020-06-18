import React, { useEffect, useState } from 'react'

export default function ComeHapen () {
  const [imagesSrc, setSrc] = useState([]);

  const fetchImg = () => {
    return new Promise((resolve, reject) => {
      fetch('http://mock.shtodream.cn/mock/5e8ec238b9b0d45a938f5d7a/test/getImage').then(res => res.json())
        .then((res) => {
          // console.log('res', res)
          resolve(res);
        })
    })
  }
  const fetchImg2 = async () => {
    let response = await fetch('http://mock.shtodream.cn/mock/5e8ec238b9b0d45a938f5d7a/test/getImage')
    // console.log('response', response);
    let json = await response.json();
    // console.log('json', json)
    return json
  }

  let docs = new Array(20).fill({})

  let results;
  const dbFuc = async () => {
    try {
      let promises = docs.map(() => fetchImg());
      results = [];
      for (let promise of promises) {
        results.push(await promise);
      }
      setSrc(results);
      console.log('results', results)
    } catch (error) {

    }
  }


  const dbFuc2 = async () => {
    try {
      let promises = docs.map(() => fetchImg2());
      let res = await Promise.all(promises);
      console.log('res', res)
    } catch (error) {

    }
  }


  useEffect(() => {
    // dbFuc()
    dbFuc2()
    fetchImg2()
  }, [])
  return (
    <div>
      {
        imagesSrc.map((img, i) => <img src={img.image} key={i} alt={i} />)
      }
    </div>
  )
}
