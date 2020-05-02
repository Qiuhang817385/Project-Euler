import React from "react";
import { createSubscription } from "create-subscription";
// Start with a simple component.
// In this case, it's a function component, but it could have been a class.
// 这是一个函数组件
export default function Subscribe ({ loadingStatus }) {
  if (loadingStatus === undefined) {
    // Loading
  } else if (loadingStatus === null) {
    // Error
  } else {
    // Success
  }
}

// Create a wrapper component to manage the subscription.
// 创建一个容器组件去管理订阅
// 订阅函数
/* const EventHandlerSubscription = createSubscription({
  // 获取当前需要订阅的值
  // getCurrentValue: eventDispatcher => eventDispatcher.value,
  getCurrentValue: eventDispatcher => eventDispatcher.value,
  // 订阅函数,当eventDispatcher发生变化的时候调用回调函数
  subscribe: (eventDispatcher, callback) => {
    const onChange = event => callback(eventDispatcher.value);

    eventDispatcher.addEventListener("change", onChange);

    return () => eventDispatcher.removeEventListener("change", onChange);
  }
}); */

const PromiseSubscription = createSubscription({
  getCurrentValue: promise => {
    // There is no way to synchronously read a Promise's value,
    // So this method should return undefined.
    return undefined;
  },
  subscribe: (promise, callback) => {
    promise.then(
      // Success
      value => callback(value),
      // Failure
      () => callback(null)
    );

    // There is no way to "unsubscribe" from a Promise.
    // create-subscription will still prevent stale values from rendering.
    return () => { };
  }
});

// Your component can now be used as shown below.
// In this example, 'eventDispatcher' represents a generic event dispatcher.通用事件调度器
// let eventDispatcher = { value: 12 };

{/* <EventHandlerSubscription source={eventDispatcher}>
  {value => <Subscribe followersCount={value} />}
</EventHandlerSubscription>; */}

<PromiseSubscription source={loadingPromise}>
  {loadingStatus => <LoadingComponent loadingStatus={loadingStatus} />}
</PromiseSubscription>