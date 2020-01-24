import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Catalog from './Catalog'
import Purchases from './Purchases'
import Collection from './Collection'
//import Roster from './Roster'
//import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/catalog' component={Catalog}/>
          <Route path='/purchases' render={(props) => <Purchases authenticated={this.props.authenticated} userId={this.props.userId}/>}/>          
          <Route path='/collection' render={(props) => <Collection authenticated={this.props.authenticated} userId={this.props.userId}/>}/>
        </Switch>
      </main>

    )};
}

export default Main
