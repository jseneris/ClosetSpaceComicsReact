import React, { Component } from 'react';
import './SearchBar.css';

const weeklyOptions = {
  '11/27/2019':'11/27/2019',
  '11/20/2019':'11/20/2019',
  '11/13/2019':'11/13/2019',
  '11/06/2019':'11/06/2019',
  '10/23/2019':'10/23/2019',
  '10/30/2019':'10/30/2019',
  '10/16/2019':'10/16/2019',
  '10/09/2019':'10/09/2019',
  '10/02/2019':'10/02/2019'
};

class SearchBar extends Component{
  constructor(props){
    super(props);

    this.state = {sortBy:'11/27/2019'};
  }

  render(){
    return (
      <div className="SearchBar">
      <label>Week of:</label>
        <select id="weekSelect">
          <option value="11/27/2019">11/27/2019</option>
          <option value="11/20/2019">11/20/2019</option>
          <option value="11/13/2019">11/13/2019</option>
          <option value="11/06/2019">11/06/2019</option>
          <option value="10/30/2019">10/30/2019</option>
          <option value="10/23/2019">10/23/2019</option>
          <option value="10/16/2019">10/16/2019</option>
          <option value="10/09/2019">10/09/2019</option>
          <option value="10/02/2019">10/02/2019</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;
