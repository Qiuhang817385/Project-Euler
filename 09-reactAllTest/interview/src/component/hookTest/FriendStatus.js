import React from 'react'
// 用来显示好友的登录状态
export default function FriendStatus (props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange (status) {
      setIsOnline(status.isOnline);
    }
    // 这个API
    // 怎么使用发布订阅模式???
    // subscribeToFriendStatus,订阅函数
    // 第一个参数,订阅源
    // 第二个参数,当订阅源数据改变的时候调用的回调函数
    // 订阅是一个组件
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup () {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
