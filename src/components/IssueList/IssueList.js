import React, {Component} from 'react';
import './IssueList.css';
import IssueFilter from '../IssueFilter/IssueFilter';
import Issue from '../Issue/Issue';


class IssueList extends Component {
  constructor(props){
    super(props);

    this.state = {pubFilter: []};

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(pubFilter){
    console.log("state: " + this.state.pubFilter);
    console.log("add/delete: " + pubFilter);
    let newFilter = this.state.pubFilter;
    let pubIndex = this.state.pubFilter.indexOf(pubFilter);
    if (pubIndex >= 0){
      newFilter.splice(pubIndex, 1);
      console.log(newFilter);
      this.setState({pubFilter: newFilter});
    }
    else{
      newFilter.push(pubFilter);
      console.log(newFilter);
      this.setState({pubFilter: newFilter});
    }
  }

  resetFilter = () => {
    this.setState({pubFilter: []});
  }

  render(){
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
          {this.props.issues.map(issue => {
            if(this.state.pubFilter.length === 0 || this.state.pubFilter.includes(issue.publisher)){
              return <Issue issue={issue} />
            }
          })}
        </div>
      </div>
    );
  };
}

export default IssueList;
