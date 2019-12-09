import React, { Component } from 'react';
import './IssueFilter.css';

class IssueFilter extends Component {
  constructor(props){
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event){
    let publisher = event.target.parentElement.getAttribute("data-publisher");
    this.props.applyFilter(publisher);
//      console.log("filter");
//      console.log("filter:" + this.state.pubFilter);
//      let newPubList = this.state.pubFilter.push(publisher);
//      console.log("new filter:" + newPubList);
//      this.setState({pubFilter: newPubList});
//      var pubs = document.querySelectorAll("[data-publisher]:not([data-publisher=" + publisher + "])");
//      pubs.forEach(x => {
//        if (x.parentElement.classList.contains("Issue")){
//          x.parentElement.style.display = 'none';
//        }
//      });
//      console.log("done");
  }

  renderButton(){
    if (this.props.filter.imageUrl){
      return <img src={this.props.filter.imageUrl}  alt={this.props.filter.publisher}/>
    }
    else{
      return <span>{this.props.filter.publisher} </span>
    }
  }

  render(){
    return(
      <button className={"pubLogo " + (this.props.active ? '' : 'inactive')} key={this.props.filter.publisher} data-publisher={this.props.filter.publisher} onClick={this.handleFilterChange}>
        {this.renderButton()}
      </button>
    );
  };
}

export default IssueFilter;
