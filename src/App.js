import React, {Component} from 'react';
import logo from './logo125.png';
import banner from './banner.jpeg';
import './App.css';
import Main from './pages/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
}

  render(){
    return (
      <Main />
    );
  }
}

export default App;
