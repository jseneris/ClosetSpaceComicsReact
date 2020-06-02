import React, { Component } from 'react';
import IssueFilter from '../IssueFilter/IssueFilter';
import IssueZoom from '../IssueZoom/IssueZoom';
import Issue from '../Issue/Issue';

class IssueList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issues: this.props.Issues,
      pubFilter: [],
      zoom: false,
    };

    this.applyFilter = this.applyFilter.bind(this);
    this.zoomToIssue = this.zoomToIssue.bind(this);
    this.zoomChange = this.zoomChange.bind(this);
    this.zoomExit = this.zoomExit.bind(this);
    this.updateIssues = this.updateIssues.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Issues !== this.props.Issues) {
      this.setState({ issues: newProps.Issues, pubFilter: [], zoom: false });
    }
  }

  applyFilter(pubFilter) {
    let newFilter = this.state.pubFilter;
    let pubIndex = this.state.pubFilter.indexOf(pubFilter);
    if (pubIndex >= 0) {
      newFilter.splice(pubIndex, 1);
    } else {
      newFilter.push(pubFilter);
    }
    var filteredIssues = this.props.Issues.filter((issue) => {
      return (
        this.state.pubFilter.length === 0 ||
        this.state.pubFilter.includes(issue.publisher)
      );
    });
    this.setState({ pubFilter: newFilter, issues: filteredIssues });
  }

  zoomToIssue(title) {
    var target = this.props.Issues.find(
      (issue) => issue.title + ' ' + issue.issueNum === title
    );
    this.setState({ zoom: true, issue: target });
  }

  zoomChange(target) {
    this.setState({ issue: target });
  }

  zoomExit() {
    this.setState({ zoom: false });
  }

  updateIssues(issues) {
    var filteredIssues = issues.filter((issue) => {
      return (
        this.state.pubFilter.length === 0 ||
        this.state.pubFilter.includes(issue.publisher)
      );
    });
    this.setState({ issues: filteredIssues });
  }

  render() {
    if (this.state.zoom) {
      return (
        <IssueZoom
          issue={this.state.issue}
          issues={this.state.issues}
          handleZoomChange={this.zoomChange}
          handleZoomExit={this.zoomExit}
        />
      );
    } else if (this.state.Loading) {
      return <div className="center-text">loading</div>;
    } else if (this.state.issues.length === 0) {
      return <div className="center-text">No books released this week</div>;
    } else {
      return (
        <div className="IssueList">
          <div className="filter-div">
            <span className="filter-label">Filter</span>
          </div>
          <div className="IssueFilter">
            <div className="filter-list">
              {this.props.Filters.map((filter) => {
                return (
                  <IssueFilter
                    filter={filter}
                    key={filter.publisher}
                    active={
                      this.state.pubFilter.length === 0 ||
                      this.state.pubFilter.includes(filter.publisher)
                    }
                    applyFilter={this.applyFilter}
                  />
                );
              })}
            </div>
          </div>
          <div className="row">
            {this.state.issues.map((issue) => {
              return <Issue issue={issue} zoomToIssue={this.zoomToIssue} />;
            })}
          </div>
        </div>
      );
    }
  }
}

export default IssueList;
