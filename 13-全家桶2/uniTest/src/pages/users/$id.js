// 动态路由：以$开头的文件或目录
// 函数组件?
export default function (props) {
  return (
    <div>
      <h1>user id: {props.match.params.id}</h1>
    </div>
  );
}