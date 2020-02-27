import React, { Component } from 'react'
import Cart from '../Cart/Cart';
export default class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      goods: [
        { text: '百万年薪架构师', price: 100, id: 1 },
        { text: 'web全栈架构师', price: 80, id: 2 },
        { text: 'Python爬虫', price: 60, id: 3 }
      ],
      cart: []
    }
  }
  textChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  addGoods = () => {
    this.setState(prevState => {
      return {
        goods: [...prevState.goods, { id: prevState.goods.length + 1, text: prevState.text }],
        text: ''
      }
    })
  }
  addMore = (good) => {
    // 创建新购物车
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.id === good.id);
    const item = newCart[idx];
    if (item) {
      newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    } else {
      newCart.push({ ...good, count: 1 })
    }
    this.setState({
      cart: newCart
    })
  }

  dec = (good) => {
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.id === good.id);
    const item = newCart[idx];
    newCart.splice(idx, 1, { ...item, count: item.count - 1 })
    this.setState({
      cart: newCart
    })
  }
  add = (good) => {
    const newCart = [...this.state.cart];
    const idx = newCart.findIndex(c => c.id === good.id);
    const item = newCart[idx];
    newCart.splice(idx, 1, { ...item, count: item.count + 1 })
    this.setState({
      cart: newCart
    })
  }

  render () {
    // const { } = this.props;
    const { goods } = this.state;
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.textChange} />
        <button onClick={this.addGoods}>按钮</button>
        {
          goods.map((item) => {
            return (
              <div key={item.id}> {item.text}
                <button onClick={() => { this.addMore(item) }}>加购</button>
              </div>
            )
          })
        }

        <br />
        {/* {购物车} */}
        <Cart data={this.state.cart} dec={this.dec} add={this.add}></Cart>
      </div >
    )
  }
}