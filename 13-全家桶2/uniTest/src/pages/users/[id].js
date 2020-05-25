// 创建users/$id.js，内容和其他页面相同，显示一下传参
export default function (props) {
  console.log('路由props', props)
  return (
    <div>
      <h1>user id: {props.match.params.id}</h1>
    </div>
  );
}