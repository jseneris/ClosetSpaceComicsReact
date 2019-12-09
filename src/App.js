import React, {Component} from 'react';
import logo from './logo125.png';
import banner from './banner.jpeg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar/SearchBar';
import IssueList from './components/IssueList/IssueList';
import ClosetSpaceComicsApi from './utils/ClosetSpaceComicsApi';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {issues: [], filters:[]};

    this.searchByDate = this.searchByDate.bind(this);
    this.issueListElement = React.createRef();
  }

  searchByDate(date){
    ClosetSpaceComicsApi.searchByDate(date).then(response => {
      this.setState({issues: response.Issues, filters: response.Filters});
    });
    if (this.issueListElement != null ){
      if (this.issueListElement.current != null){
        if (this.issueListElement.current.resetFilter != null){
          this.issueListElement.current.resetFilter();
        }
      }
    }
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
                <SearchBar searchByDate={this.searchByDate}/>
                <IssueList issues={this.state.issues} filters={this.state.filters} ref={this.issueListElement} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
