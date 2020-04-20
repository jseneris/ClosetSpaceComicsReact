import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Catalog from './Catalog'
import Purchases from './Purchases'
import Collection from './Collection'
import CollectionByTitle from './CollectionByTitle'
import About from './About'

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
          <Route path='/purchases' render={(props) => <Purchases Authenticated={this.props.Authenticated} UserId={this.props.UserId}/>}/>
          <Route path='/collection' render={(props) => <Collection Authenticated={this.props.Authenticated} UserId={this.props.UserId}/>}/>
          <Route path='/collectionbytitle' render={(props) => <CollectionByTitle Authenticated={this.props.Authenticated} UserId={this.props.UserId}/>}/>
          <Route path='/about' render={(props) => <About Authenticated={this.props.Authenticated} UserId={this.props.UserId}/>}/>
        </Switch>
      </main>

    )};
}

export default Main
