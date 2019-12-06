import React, { Component } from 'react';
import './IssueFilter.css';
import marvelLogo from './marvel.png';
import dcLogo from './dc.png';


class IssueFilter extends Component {
  render(){
    return(
      <div className="IssueFilter">
        <div className="filterList">
          <div className="pubLogo">
              <img src={dcLogo} data-publisher="dc" />
          </div>
          <div className="pubLogo">
              <img src={marvelLogo} data-publisher="marvel" />
          </div>
        </div>
      </div>
    );
  };
}

export default IssueFilter;
