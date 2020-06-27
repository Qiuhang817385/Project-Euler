import React, { Suspense } from 'react';
import { Spin } from 'antd';
import SubRoute from './SubRoute'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LayOut from './LayOut'
import routes from './routes';

function RouteAll () {
  return (
    <Router>
      <LayOut>{/* 布局页 */}
        <Suspense fallback={<Spin />}>

          <Switch>
            {
              routes && routes.map((route, index) => {
                return <SubRoute key={index} {...route} />
              })
            }
          </Switch>
        </Suspense>
      </LayOut>
    </Router>
  )
}

export default RouteAll;