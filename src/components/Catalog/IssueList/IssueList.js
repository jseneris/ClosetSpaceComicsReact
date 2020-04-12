import React, {Component} from 'react';
import './IssueList.css';
import IssueFilter from '../IssueFilter/IssueFilter';
import IssueZoom from '../IssueZoom/IssueZoom';
import Issue from '../Issue/Issue';


class IssueList extends Component {
  constructor(props){
    super(props);
    this.issues = this.props.issues;

    this.state = {pubFilter: []};

    this.applyFilter = this.applyFilter.bind(this);
    this.handleIssueClick = this.applyFilter.bind(this);
    this.zoomToIssue = this.zoomToIssue.bind(this);
    this.zoomChange = this.zoomChange.bind(this);
    this.zoomExit = this.zoomExit.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
  }

  applyFilter(pubFilter){
    let newFilter = this.state.pubFilter;
    let pubIndex = this.state.pubFilter.indexOf(pubFilter);
    if (pubIndex >= 0){
      newFilter.splice(pubIndex, 1);
    }
    else{
      newFilter.push(pubFilter);
    }
    this.issues = this.props.issues.filter(issue => {
      return (this.state.pubFilter.length === 0 || this.state.pubFilter.includes(issue.publisher))
    });
    this.setState({pubFilter: newFilter});
  }

  resetFilter = () => {
    this.setState({pubFilter: [], zoom: false});
  }

  zoomToIssue(title){
    var target = this.props.issues.find(issue => issue.title + ' ' + issue.issueNum === title);
    this.setState({zoom: true, issue: target});
  }

  zoomChange(target){
    this.setState({issue: target});
  }

  zoomExit(){
    this.setState({zoom:false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.updateIssues(nextProps.issues);
    return true;
  }

  updateIssues(issues){
    this.issues = issues.filter(issue => {
      return (this.state.pubFilter.length === 0 || this.state.pubFilter.includes(issue.publisher))
    });
  }

  render(){
    if (this.state.zoom){
      return (
          <IssueZoom issue={this.state.issue} issues={this.issues} handleZoomChange={this.zoomChange} handleZoomExit={this.zoomExit}/>
      );
    }
    else{
      if (this.issues.length == 0){
        return (
          <div className="center-text">
              No books released this week
          </div>
        );
      }
      else{
        return(
          <div className="IssueList">
            <div className="filterDiv">
              <span className="filterLabel">Filter</span>
            </div>
            <div className="IssueFilter">
              <div className="filterList">
                {this.props.filters.map(filter => {
                  return <IssueFilter filter={filter} key={filter.publisher} active={this.state.pubFilter.length === 0 || this.state.pubFilter.includes(filter.publisher)} applyFilter={this.applyFilter}/>
                })}
              </div>
            </div>
            <div className="row">
              {this.issues.map(issue => {
                return <Issue issue={issue} zoomToIssue={this.zoomToIssue}/>
              })}
            </div>
          </div>
        );
      }
    }
  };
}

export default IssueList;
