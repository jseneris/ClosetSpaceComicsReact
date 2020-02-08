import React, {Component} from 'react';
import logo from '../logo125.png';
import banner from '../banner.jpeg';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props);
}



  render(){
    return (
      <div className="App">
        <div className="container-fluid">
            <div className="legend">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <div>
                    <img className="title-big" src={banner} alt="banner"/>
                </div>
            </div>
            <div>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/catalog'>Catalog</Link></li>
              <li><Link to='/purchases'>Purchase List</Link></li>
              <li><Link to='/collection'>Collection</Link></li>
              <li><Link to='/collectionbytitle'>Collection By Title</Link></li>
            </ul>
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

export default Home;
