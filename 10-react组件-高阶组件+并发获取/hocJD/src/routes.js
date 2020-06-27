import React, { lazy } from 'react';
const Home = lazy(() => import('./pages/Home/Home'))
// const CarouseAll = lazy(() => import('./pages/CarouseAll/CarouseAll'))
// webpack只要打包，就会对引入的依赖关系进行检测
const Page1 = lazy(() => import('./pages/Page1/Page1'))
const NotFound = ({ location }) => {
  console.log('location', location)
  return (
    <div>
      <h3>找不到ha</h3>
    </div>
  )
}


const routes = [
  {
    path: '/',
    Component: Home,
    exact: true
  },

  {
    path: '/Page1',
    Component: Page1,
    exact: true
  },

  {
    path: '*',
    Component: NotFound
  }]

export default routes;