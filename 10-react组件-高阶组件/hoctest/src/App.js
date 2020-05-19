import React, { Component } from 'react';
function Kaikeba (props) {
  return <div>
    {/* stage是静态数据,name是动态获取的 */}
    {props.stage}-{props.name}
  </div>
}


const withKaikeba = Comp => {
  const name = '动态获取的'
  // return props => <Comp {...props} name={name} />
  // ============================================================核心
  return (props) => {
    return <Comp {...props} name={name} />
  }
  // ============================================================核心
}

const withKaikeba2 = Comp => {
  const name = '动态获取的'
  // ============================================================核心
  return class NewComp extends Component {
    componentDidMount () {
      console.log('do someting')
    }
    render () {
      return <Comp {...this.props} name={name}></Comp>
    }
  }
  // ============================================================核心
}

const withLog = Comp => {
  console.log(Comp.name)
  return props => <Comp {...props} />
}

// const NewKaikeba = withKaikeba(Kaikeba);
const NewKaikeba = withLog(withKaikeba2(Kaikeba));

// 组件复合,一个共用的对话框
function Dialog (props) {
  // 传递进来的是两个jsx对象
  console.log('props.children', props.children)
  return <div style={{ border: '1px solid red', color: props.color || 'blue' }}>
    {props.children}
    <div style={{ border: '2px solid #333' }}>
      <h3>footer</h3>
      {props.footer}
    </div>
  </div>
}

function WelcomeDialog (props) {
  return <div>
    <h3>WelcomeDialog组件复合使用</h3>
    {/* 或者使用props.color */}
    <Dialog {...props} >
      <h4>欢迎光临</h4>
      <p>感谢使用</p>
    </Dialog>
  </div>
}

// 实现具名插槽
function Footers (props) {
  return <div>
    这里是footer
  </div>
}
// 实现具名插槽
function Header (props) {
  return <div>
    这里是Header
  </div>
}
// 实现具名插槽
function Content (props) {
  return <div>
    这里是Content
  </div>
}

// 再看看共享单车的布局
const Frame = (props) => {
  return <div>
    <div style={{ border: '1px solid #ff0' }}>
      {props.header}
    </div>
    <div style={{ border: '1px solid #f0f' }}>
      {props.content}
    </div>
    <div style={{ border: '1px solid #0ff' }}>
      {props.footer}
    </div>
  </div>
}

const Api = {
  getUser () {
    return { name: 'qiu', age: 20 }
  }
}

const Fetch = (props) => {
  const user = Api[props.name]();
  console.log('props.children', props.children)
  // 相当于给children里面传递数据,把插槽里面的数据,返回给可以更换的零件元素
  return props.children(user)
}


function App () {
  return (
    <>
      {/* <NewKaikeba stage="React" /> */}
      <hr />
      <h4>组件复合</h4>

      <WelcomeDialog color={"red"} footer={<Footers />} />
      <hr />
      <Frame header={<Header />} content={<Content />} footer={<Footers />} />
      <hr />
      <Fetch
        name="getUser"
      >
        {/* 这个就是一个可以更换的零件元素,传递给children的相当于就是一个函数 */}
        {
          ({ name, age }) => (
            <>
              <h1>这是一个零件插槽,用于获取插槽里面的数据</h1>
              <p>{name}-{age}</p>
            </>
          )
        }
      </Fetch>
    </>
  );
}

export default App;
