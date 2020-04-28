import React, {Component} from 'react';

import SearchBar from '../components/Catalog/SearchBar/SearchBar';
import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class Catalog extends Component {
  constructor(props){
    super(props);

    this.state = {
      issues: [],
      filters:[]};

    this.handleSearchByDate = this.handleSearchByDate.bind(this);
  }


  handleSearchByDate(date){
    ClosetSpaceComicsApi.searchByDate(date).then(response => {
      this.setState({issues: response.Issues, filters: response.Filters});
    });
  }

  render(){
    return (
      <div className="catalogDiv">
        <SearchBar SearchByDate={this.handleSearchByDate}/>
        <IssueList Issues={this.state.issues} Filters={this.state.filters} />
      </div>
    );
  }
}

export default Catalog;
