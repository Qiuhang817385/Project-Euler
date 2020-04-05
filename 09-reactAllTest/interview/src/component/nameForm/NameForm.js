import React, { useState } from 'react'
// 1.唯一数据源来源于state
// 2.
/* 
在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，
这使 state 成为唯一数据源

由于 handlechange 在每次按键时都会执行并更新 React 的 state，
因此显示的值将随着用户输入而更新

对于受控组件来说，每个 state 突变都有一个相关的处理函数。这使得修改或验证用户输入变得简单。例如，如果我们要强制要求所有名称都用大写字母书写，我们可以将 handlechange 改写为：
 */
export default function NameForm () {
  const [value, setValue] = useState('');
  const [textareaValue, settextareaValue] = useState('请撰写一篇关于你喜欢的 DOM 元素的文章');
  const [selectValue, setselectValue] = useState(['grapefruit', 'coconut']);
  const [isGoing, setIsGoing] = useState(true);
  const [numberOfGuests, setNumberOfGuests] = useState(2)
  // input
  let handleChange = (e) => {
    setValue(e.target.value.toUpperCase())
  }
  // textarea
  let handleChangetextarea = (e) => {
    settextareaValue(e.target.value)
  }
  //select
  let handleSelectValue = (e) => {
    console.log('e.target.value :', e.target.value);
    if (selectValue.indexOf(e.target.value) !== -1) {
      let index = selectValue.indexOf(e.target.value);
      let NselectValue = selectValue;
      NselectValue.splice(index, 1);
      setselectValue([...NselectValue]);
    } else {
      setselectValue([...selectValue, e.target.value])
    }
  }
  // 多选表单
  let handleNameInputChange = (event) => {
    const target = event.target;
    console.log('target.name', target.name)
    console.log('target.name === isGoing :', target.name === 'isGoing');
    const value = target.name === 'isGoing' ? target.checked : target.value;
    console.log('target.checked :', target.checked);
    console.log('value :', value);

    if (target.name === 'isGoing') {
      console.log('value :', value);
      setIsGoing(value)
    } else {
      console.log('value :', value);
      setNumberOfGuests(value)
    }

  }

  // 受控输入空值
  /* 
      <input value="hi" />    不可以编辑
      <input value={null} />   null或者undefined可以编辑
   */
  let handleSubmit = (event) => {
    alert('提交的名字: ' + value);
    alert('提交的文章: ' + textareaValue);
    // alert('你喜欢的风味是: ' + selectValue);
    event.preventDefault();
  }
  /**
   * 在提交时打印出名称
   */
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          名字:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <label>
          文章:
          <textarea value={textareaValue} onChange={handleChangetextarea} />
        </label>
        {/* select标签 */}
        {/* React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它。
        当然使用了的话也有效果
         */}
        {/* 不使用multiple的话,就是正常的单选下拉按钮 */}
        <select multiple={true} value={selectValue} onChange={handleSelectValue}>
          <option value="grapefruit">葡萄柚</option>
          <option value="lime">酸橙</option>
          <option value="coconut">椰子</option>
          <option value="mango">芒果</option>
        </select>

        {/* 总的来说，这使得 <input type="text">, <textarea> 和 <select> 之类的标签都非常相似 */}
        {/* 
          注意

          你可以将数组传递到 value 属性中，以支持在 select 标签中选择多个选项：

          <select multiple={true} value={['B', 'C']}>
         */}
        <hr />
        <br />
        <div>
          处理多个表单
        </div>
        {/* 表单1 */}
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={isGoing}
            onChange={handleNameInputChange} />
        </label>
        {/* 表单2 */}
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={numberOfGuests}
            onChange={handleNameInputChange} />
        </label>

        <input type="submit" value="提交" />
      </form>
    </>
  )
}
/*
  在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，
  根据用户输入进行更新。

  在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，
  根据setState()来更新。

  // 使用state数据源
把两者结合起来，使 React 的 state 成为“唯一数据源”。
  // React组件控制输入更新
渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。

被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。
   */


