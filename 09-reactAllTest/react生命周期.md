详情查看 9 号计划

# 重命名安全的生命周期

```
npx react-codemod rename-unsafe-lifecycles
```

# 哪三个生命周期???

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

```
`UNSAFE_componentWillMount`
`UNSAFE_componentWillReceiveProps`
`UNSAFE_componentWillUpdate`
```

v16.3 之前的 react 生命周期

4 个阶段

1.initiallization

2.mounting

3.updation

4.ummounting

- 开始--->

- static defaultProps={} static propTypes={}--->

- constructor(){

​ super().this.state={}

}

- componentWillMount()
- render()
- componentDidMount()
- componentWillReciveProps
- shouldcomponentUpdate(){}
- componentwillupdate(){}
- render
- componentdidupdate()

## 问题,父组件包含子组件,生命周期的执行循序

1.父类 constructor

2.父类 willmount

3.子类 constructor

4.子类 componentwillmount

5.子类 didmount

6.父类 didmount

父组件挂载,这过程不跟更新一样一样吗,

挂载-刷新-挂载完毕

更新-刷新-更新完毕

P-willmount
P-render

C-willmount
C-render
C-didmount

P-didmount

update 的顺序

父组件更新

P-willupdate
P-render

C-willupdate
C-render
C-didupdate

P-didupdate
回调

子组件更新

C-willupdate
C-render
C-didupdate

# 新的生命周期

- We are **introducing two new lifecycles**, static `getDerivedStateFromProps` and `getSnapshotBeforeUpdate`.用来代替`componentWillReceiveProps`.

```
static getDerivedStateFromProps(props, state) {
    // ...
  }
```

组件实例化之后和重新呈现之前

It can return an object to update `state`, or `null` to indicate that the new `props` do not require any `state` updates

Together with `componentDidUpdate`, this new lifecycle should cover all use cases for the legacy

## Context

> Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，
但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题）--->也就是父组件传递给子组件,子组件包含多个子组件,那么都需要传递一下,显然太浪费,这些属性是应用程序中许多组件都需要的。
Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

一般的使用 Context 的结构

顶级---父亲---儿子
顶级用 provider 包含
父亲不做任何事情
儿子可以拿到 context 的值

- Context 的 API

  - React.createContext 创建 Context
    - const MyContext = React.createContext(defaultValue);
    - 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效,也就是错误默认值
  - Context.Provider 为最顶级父类 App 包含进去,像 react-router 一样
    - <MyContext.Provider value={/_ 某个值 _/}>
    - 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。也就是说只要 value 值更新就会渲染
  - Class.contextType
    - 引入
    - MyClass.contextType = MyContext;
    - 使用 let value = this.context;
  - Context.Consumer
    `<MyContext.Consumer> {value => /* 基于 context 值进行渲染*/} </MyContext.Consumer>`
    - 这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
    - “函数作为子元素（function as a child）” 模式
  - Context.displayName

    - 组件在 DevTools 中将显示为 MyDisplayName：
      const MyContext = React.createContext(/_ some value _/);
      MyContext.displayName = 'MyDisplayName';
      <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中

- 示例
  - 动态 Context
  - 在嵌套组件中更新 Context
  - 使用多个 Context

## 什么时候使用?

Context 能让你将这些数据向组件树下所有的组件进行“广播”
对于一个组件树而言是“全局”的数据
例如当前认证的用户、主题或首选语言。
Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。
请谨慎使用，因为这会使得组件的复用性变差。
如果你只是想避免层层传递一些属性，
组件组合（component composition）有时候是一个比 context 更好的解决方案。
