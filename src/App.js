import React, {Component} from 'react';
import logo from './logo.svg';
import logo2 from './logo125.png';
import banner from './background_search_desktop.jpg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import IssueList from './components/IssueList/IssueList';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {businesses: []};

  }

  render(){
    return (
      <div className="App">
        <div className="container-fluid">
            <div className="legend">
                <div className="logo">
                    <img src={logo2} />
                </div>
                <div>
                    <img className="title-big" src={banner} />
                </div>
                <SearchBar searchYelp={this.searchYelp}/>
                <IssueList/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
