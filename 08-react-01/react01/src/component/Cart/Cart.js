import React, { Component } from 'react'
export default class Cart extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount () {
    console.log(this.props);

  }
  render () {
    const { data, dec, add } = this.props

    return (
      <div>
        {
          data.map((item) => {
            return (
              <div key={item.id}>
                <div>
                  <span>
                    /名称:{item.text}
                  </span>
                  <span>
                    /数量:
                    <button onClick={() => dec(item)}>-</button>
                    {item.count}
                    <button onClick={() => add(item)}>+</button>
                  </span>
                  <span>
                    /价格:{item.price}
                  </span>
                </div>
                <div>

                </div>

              </div>
            )
          })
        }
      </div>
    )
  }
}
