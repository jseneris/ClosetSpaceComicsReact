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
            <div className="aboutHeader">
              Stuff To Do
            </div>
            <div>
              <h4>Catalog</h4>
                <ul>
                  <li>Search By Title Option</li>
                    <ul>
                      <li>Add</li>
                    </ul>
                  <li>Clean Up Zoom</li>
                  <ul>
                    <li>Fix margins for sections</li>
                    <li>Return to list button</li>
                    <li>Extend filter to bottom scroll</li>
                    <li>Switch to title issue scroll?</li>
                  </ul>
                  <li>Demo</li>
                    <ul>
                      <li>Seed data to run in logged out state</li>
                      <li>Setup for new users</li>
                    </ul>
                </ul>
              <h4>Collection</h4>
                <ul>
                  <li>Location List</li>
                    <ul>
                      <li>Formatting</li>
                    </ul>
                  <li>Box List</li>
                    <ul>
                      <li>Formatting</li>
                    </ul>
                  <li>Display</li>
                    <ul>
                      <li>Formatting</li>
                      <li>Move Books</li>
                        <ul>
                          <li>Change Order Within Box</li>
                          <li>Move Book between Boxes</li>
                        </ul>
                    </ul>
                    <li>Refactor</li>
                </ul>
              <h4>Purchases</h4>
                <ul>
                  <li>Purchase List</li>
                    <ul>
                      <li>Formatting for purchase list</li>
                      <li>Handle end of list for more button</li>
                      <li>Collapse purchase list when purchase selected</li>
                      <li>Edit purchase details</li>
                      <li>Refactor</li>
                    </ul>
                </ul>
            </div>
          </div>
      </div>
    );
  }
}

export default About;