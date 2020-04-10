import React, {Component} from 'react';
import banner from '../banner.jpeg';

import SearchBar from '../components/Catalog/SearchBar/SearchBar';
import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class Catalog extends Component {
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

export default Catalog;
