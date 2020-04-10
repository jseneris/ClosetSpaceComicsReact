import React, {Component} from 'react';
import banner from '../banner.jpeg';
import { Link } from 'react-router-dom'
import Home from './Home'
import Catalog from './Catalog'
import Purchases from './Purchases'
import Collection from './Collection'
import CollectionByTitle from './CollectionByTitle'

class About extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps (newProps) {
    if( newProps.userId !== this.props.userId ){
      this.setState({refresh: true});
    }
  }

  render(){
    return (
      <div className="App">
        <div className="container-fluid">
            <div className="legend">
                <div>
                    <img className="title-big" src={banner} alt="banner"/>
                </div>
            </div>
            <div>
              <h4>Catalog</h4>
                <ul>
                  <li>Title Search</li>
                  <li>Clean Up Zoom</li>
                  <li>Home Text</li>
                  <li>Demo</li>
                </ul>
              <h4>Collection</h4>
                <ul>
                  <li>Location List</li>
                  <li>Box List</li>
                  <li>Display</li>
                  <ul>
                    <li>Move Books</li>
                  </ul>
                </ul>
              <h4>Purchases</h4>
                <ul>
                  <li>Purchase List</li>
                </ul>
            </div>
          </div>
      </div>
    );
  }
}

export default About;
