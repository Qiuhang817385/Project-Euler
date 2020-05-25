import React from 'react';
import styles from './_layout.css';

export default (props) => {
  console.log('props', props)
  return (
    <div>
      <h1 className={styles.title}>Page users/_layout</h1>
      <div>这里是:{props.children}</div>
    </div>
  );
}
