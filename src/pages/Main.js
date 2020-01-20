import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Catalog from './Catalog'
import Purchases from './Purchases'
//import Roster from './Roster'
//import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/catalog' component={Catalog}/>
      <Route path='/purchases' component={Purchases}/>
    </Switch>
  </main>
)

export default Main