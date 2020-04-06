import React, { useState, useEffect } from 'react'

export default function HookTest () {
  const [count, setCount] = useState(0);

  // 发布订阅模式,isOnline和setIsOnline修改在线状态
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    document.title = `You clicked ${count}times`;
  })


  // 用于显示好友是否在线的 FriendStatus 组件。
  // 从 class 中 props 读取 friend.id，然后在组件挂载后订阅好友的状态，并在卸载组件的时候取消订阅：
  useEffect(() => {
    // 用来修改isOnline的状态,接收参数 status
    function handleStatusChange (status) {
      setIsOnline(status.isOnline);
    }
    // 调用这个API,订阅好友的状态,如果好友在线,接收到好友的ID并且调用handleStatusChange方法
    // 这个API的应用场景
    // 1.自己登陆的时候自动获取所有好友的id号然后进行遍历
    // 2.好友的状态发生了改变的时候自动发布自己的状态号并且自己进行相应的接受??
    // 这里有一个Bug,详见最底下
    // 这里的Bug只会在class当中出现，解决的办法就是在update当中进行一次取消订阅

    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    // Specify how to clean up after this effect:
    // 回到这个本身的函数的作用上面去,如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：
    // 相当于unmounted
    // 其实也可以返回一个箭头函数或者给起一个别的名字。
    return function cleanup () {
      // 返回这个API,如果好友离线,获取好友的ID并且修改状态状态
      // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // if (isOnline === null) {
  //   return 'Loading...';
  // }
  // return isOnline ? 'Online' : 'Offline';


  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
// 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。
// 不管你知不知道这些操作，或是“副作用”这个名字，应该都在组件中使用过它们
/*
  如果你熟悉 React class 的生命周期函数，
  你可以把 useEffect Hook 看做
        componentDidMount，         挂载完毕
        componentDidUpdate 和       更新完毕
        componentWillUnmount 这三个函数的组合 卸载
        注意，在这个 class 中，我们需要在两个生命周期函数中编写重复的代码。
        这是因为很多情况下，我们希望在组件加载和更新时执行同样的操作。
        从概念上说，我们希望它在每次渲染之后执行 —— 但 React 的 class 组件没有提供这样的方法。
        即使我们提取出一个方法，我们还是要在两个地方调用它。
        大多数情况我们无论是挂载完毕或者更新完毕,都需要进行相同的操作,如果使用类来模拟上面
        那么应该写成

        componentDidMount() {
          document.title = `You clicked ${this.state.count} times`;
        }
        componentDidUpdate() {
          document.title = `You clicked ${this.state.count} times`;
        }

 */

/*
无需清除的 effect
有时候，我们只想在 React 更新 DOM 之后运行一些额外的代码。
比如
  1.发送网络请求，
  2.手动变更 DOM，
  3.记录日志，
  4.这些都是常见的无需清除的操作。

  可以在 effect 中直接访问 count state 变量（或其他 props）

  Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API

  我们可以在effect当中获取最新的count的值
  而不用担心其过期的原因。

  每次我们重新渲染，都会生成新的 effect，


需要清除的 effect:用来防止内存泄漏
例如(发布订阅模式)
Context.Consumer就相当于发布和订阅模式
  订阅外部数据源。这种情况下，清除工作是非常重要的，可以防止引起内存泄露！

  如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：

  这是 effect 可选的清除机制。
  每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。
  它们都属于 effect 的一部分。
  React 何时清除 effect？ React 会在组件卸载的时候执行清除操作。
  正如之前学到的，effect 在每次渲染的时候都会执行。
  这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。
  也就是每次都是最新的effect  拿到的都是最新的state值


  但是当组件已经显示在屏幕上时，friend prop 发生变化时会发生什么？
  我们的组件将继续展示原来的好友状态。
  也就是,这个组件不能自动接受到状态的改变,只会在第一次的时候获取一次

  这是一个 bug。
  而且我们还会因为取消订阅时使用错误的好友 ID 导致内存泄露或崩溃的问题。

  在 class 组件中，我们需要添加 componentDidUpdate 来解决这个问题：

  componentDidUpdate(prevProps) {
    // 取消订阅之前的 friend.id
    // 也就是先卸载一次，跟返回的清除函数一模一样
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 订阅新的 friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  但是使用hook 就不会出现Bug
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  它并不会受到此 bug 影响。(虽然我们没有对它做任何改动。)



  // Mount with { friend: { id: 100 } } props
用户100进行登录---》修改成上线状态
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect

// Update with { friend: { id: 200 } } props
用户200进行登录，修改成上线状态
取消100的登录状态？？？
也不是，而是卸载掉200的订阅，这个时候是换了一个人监听，但是之前的200的状态是不一定发生变化的
也不是，而是卸载掉200的订阅，这个时候是换了一个人监听，但是之前的200的状态是不一定发生变化的
也不是，而是卸载掉200的订阅，这个时候是换了一个人监听，但是之前的200的状态是不一定发生变化的
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect

// Update with { friend: { id: 300 } } props
取消200的登录状态？？？？
也不是，而是卸载掉200的订阅，这个时候是换了一个人监听，但是之前的200的状态是不一定发生变化的
也不是，而是卸载掉200的订阅，这个时候是换了一个人监听，但是之前的200的状态是不一定发生变化的
也不是，而是卸载掉200的订阅，这个时候是换了一个人监听，但是之前的200的状态是不一定发生变化的
用户300进行登录，修改上线状态
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect

// Unmount
300下线
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect


 */

/*
 在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。
 比如，上面的一直是100来对这个组件进行更新，所以上面会重复执行好多次
 这样就造成了性能的浪费
      可以使用第二个参数来进行优化
 在 class 组件中，
 我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决：

 componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}

如果某些特定值在两次重渲染之间没有发生变化，
你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新


useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅


如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
 */


//  总结
/*
  useEffect:
    相当于3个生命周期函数
      1.componentDidMount
      2.componentDidUpdate
      3.compunentWillUnmount

    useEffect(()=>{
      return ()=>{
        这个函数会执行一次,相当于componentwillUnmount做的操作
      }
    },[这个参数是state,只有这个state值发生变化的时候,才执行一次useEffect,节省了性能])
 */