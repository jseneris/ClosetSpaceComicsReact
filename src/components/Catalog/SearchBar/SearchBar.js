import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component{
  constructor(props){
    super(props);
    let currentDate = new Date();
    let dayOffset = currentDate.getDay();
    if (dayOffset < 3){
      dayOffset += 7;
    }
    let closestWed = new Date(new Date().setDate(currentDate.getDate() - dayOffset + 3));
    let closestDateString = (closestWed.getMonth()+1) + '/' + closestWed.getDate() + '/' + closestWed.getFullYear();
    this.props.searchByDate(closestDateString);

    this.state = {sortBy:closestDateString};

    this.handleSearch = this.handleSearch.bind(this);
  }

  renderSortByOptions() {
    let currentDate = new Date();
    let options = [];
    let dayOffset = currentDate.getDay();
    if (dayOffset < 3){
      dayOffset += 7;
    }
    for(var x = 0; x < 10; x++){
      let closestWed = new Date(new Date().setDate(currentDate.getDate() - dayOffset + 3 - (7*x)));
      options.push((closestWed.getMonth()+1) + '/' + closestWed.getDate() + '/' + closestWed.getFullYear());
    }
    return options.map(closestWedDate => {
      return <option key={closestWedDate} value={closestWedDate}>{closestWedDate}</option>;
    });
  }

  handleSearch(event){
    this.props.searchByDate(event.target.value);
  }

  render(){
    return (
      <div className="SearchBar">
      <label>Week of:</label>
        <select id="weekSelect" onChange={this.handleSearch}>
          { this.renderSortByOptions()}
        </select>
      </div>
    );
  }
}

export default SearchBar;
