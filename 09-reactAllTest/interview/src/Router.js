import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Apps from './component/context/Apps'
import WelcomeDialog from './component/comtest/WelcomeDialog'
import NameForm from './component/nameForm/NameForm'
import NameForm2 from './component/nameForm/NameForm2'
import Calculator from './component/boilingVerdict/Calculator';
import HookTest from './component/hookTest/HookTest'
import Friend from './component/hookTest/Friend';
import Hookreducer from './component/hookreducer/Hookreducer'
import Home from './Home'
export default class Routers extends Component {
  render () {
    return (
      <>
        <Router>
          <Home>
            <Switch>
              <Route exact path="/friend" component={Friend}></Route>
              <Route exact path="/hookTest" component={HookTest}></Route>
              <Route exact path="/nameForm" component={NameForm}></Route>
              <Route exact path="/nameForm2" component={NameForm2}></Route>
              <Route exact path="/welcomeDialog" component={WelcomeDialog}></Route>
              <Route exact path="/calculator" component={Calculator}></Route>
              <Route exact path="/hook" component={Hookreducer}></Route>
              <Route exact path="/apps" component={Apps}></Route>
            </Switch>
          </Home>
        </Router>
      </>
    )
  }
}
