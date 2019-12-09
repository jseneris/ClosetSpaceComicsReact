import React, { Component } from 'react';
import './Issue.css';

class Issue extends Component{
  render(){
    let fullTitle = this.props.issue.title + ' ' + this.props.issue.issueNum;
    return(
      <div className="Issue issueImg col-lg-2 col-md-3 col-sm-4 col-xs-6">
          <img className="img-responsive" src={this.props.issue.imageUrl} alt={fullTitle} title={fullTitle}/>
      </div>
    )
  };
}

export default Issue;
