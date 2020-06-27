import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';

const SubRoute = (props) => {
  const { path, exact, Component } = props
  return (<Route
    path={path}
    exact={exact || false}
    render={props => (
      <Component {...props} routes={routes} />
    )} />)
  // render={props => {
  //   console.log('props', props);
  /* 
  history: {length: 18, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
  location: {pathname: "/echarts1", search: "", hash: "", state: null, key: "qghpbd"}
  match: {path: "/echarts1", url: "/echarts1", isExact: true, params: {…}}
   */
  // return <Component {...props} routes={routes} />}} />)
}

export default SubRoute;