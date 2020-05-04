import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton  from 'react-bootstrap/DropdownButton'

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
    this.props.SearchByDate(closestDateString);

    this.state = {sortBy:closestDateString};

    this.handleSearch = this.handleSearch.bind(this);
  }

  renderWeeklyOptions() {
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
      return <Dropdown.Item eventKey={closestWedDate} value={closestWedDate} >{closestWedDate}</Dropdown.Item>;
    });
  }

  handleSearch(event){
    if (event != 'Week of'){
      this.props.SearchByDate(event);
      var target = document.getElementById("weekSelect");
      target.innerText= event;
    }
  }

  render(){
    return (
      <div className="SearchBar">
        <DropdownButton id="weekSelect" onSelect={this.handleSearch} title={this.state.sortBy}>
          <Dropdown.Item eventKey="Week of" value="Week of" >Week of</Dropdown.Item>
          { this.renderWeeklyOptions()}
        </DropdownButton >
      </div>
    );
  }
}

export default SearchBar;
