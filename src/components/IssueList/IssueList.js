import React, {Component} from 'react';
import './IssueList.css';
import IssueFilter from '../IssueFilter/IssueFilter';
import Issue from '../Issue/Issue';


class IssueList extends Component {
  render(){
    return(
      <div className="IssueList">
        <div className="filterDiv">
          <span className="filterLabel">Filter</span>
        </div>
        <IssueFilter/>
        <Issue/>
      </div>
    );
  };
}

export default IssueList;
