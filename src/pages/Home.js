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
            </ul>
            </div>
          </div>
      </div>
    );
  }
}

export default Home;
