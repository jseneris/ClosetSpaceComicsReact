import React, { Component } from 'react';
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class IssueSearch extends Component {
  constructor(props) {
    super(props);

    let currentDate = new Date();
    let dayOffset = currentDate.getDay();
    if (dayOffset < 3) {
      dayOffset += 7;
    }

    let closestWed = new Date(
      new Date().setDate(currentDate.getDate() - dayOffset + 3)
    );
    let closestDateString =
      closestWed.getMonth() +
      1 +
      '/' +
      closestWed.getDate() +
      '/' +
      closestWed.getFullYear();

    this.state = {
      description: this.props.Description,
      size: this.props.Size,
      purchaseItems: this.props.PurchaseItems,
      searchTitles: [],
      titleIssues: [],
      dateSearch: closestDateString,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.showTitleIssues = this.showTitleIssues.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.searchByDate = this.searchByDate.bind(this);
    this.fillTitle = this.fillTitle.bind(this);
    this.addIssueToPurchase = this.addIssueToPurchase.bind(this);
  }

  searchByTitle(event) {
    var target = document.getElementById('txtSearch');

    ClosetSpaceComicsApi.searchByTitle(target.value).then((response) => {
      this.setState({ searchTitles: response.Titles });
    });
  }

  handleDateChange(event) {
    this.setState({ dateSearch: event.target.value });
  }

  searchByDate(event) {
    ClosetSpaceComicsApi.searchByDate(this.state.dateSearch).then(
      (response) => {
        this.setState({ titleIssues: response.Issues });
      }
    );
  }

  showTitleIssues(event) {
    var target = event.target.closest('.title');
    var targetId = target.getAttribute('data-name');
    var targetPurchase = this.state.searchTitles.find((element) => {
      return element.title === targetId;
    });

    this.setState({ titleIssues: targetPurchase.issues });
  }

  fillTitle(event) {
    var target = event.target.closest('.title');
    var targetId = target.getAttribute('data-id');
    ClosetSpaceComicsApi.fillTitle(targetId).then((response) => {
      var target = document.getElementById('txtSearch');

      ClosetSpaceComicsApi.searchByTitle(target.value).then((response) => {
        this.setState({ searchTitles: response.Titles });
      });
    });
  }

  addIssueToPurchase(event) {
    var targetId = event.target.getAttribute('data-id');
    this.props.AddItems(targetId);
  }

  renderSortByOptions() {
    let currentDate = new Date();
    let options = [];
    let dayOffset = currentDate.getDay();
    if (dayOffset < 3) {
      dayOffset += 7;
    }
    for (var x = 0; x < 10; x++) {
      let closestWed = new Date(
        new Date().setDate(currentDate.getDate() - dayOffset + 3 - 7 * x)
      );
      options.push(
        closestWed.getMonth() +
          1 +
          '/' +
          closestWed.getDate() +
          '/' +
          closestWed.getFullYear()
      );
    }
    return options.map((closestWedDate) => {
      return (
        <option key={closestWedDate} value={closestWedDate}>
          {closestWedDate}
        </option>
      );
    });
  }

  render() {
    return (
      <div className="search">
        <div>
          {this.state.description}
          <span>({this.state.size})</span>
        </div>
        <Row className="add">
          title: <input type="text" id="txtSearch" />
          <button onClick={this.searchByTitle}>Search</button>
          <button onClick={this.toggleSearch}>Close</button>
          <select id="weekSelect" onChange={this.handleDateChange}>
            {this.renderSortByOptions()}
          </select>
          <button onClick={this.searchByDate}>Search</button>
          <button onClick={this.props.CloseSearch}>Close</button>
        </Row>
        <Row className="searchTitles">
          {this.state.searchTitles.map((title) => {
            return (
              <Col
                className="title"
                md="1"
                data-id={title.id}
                data-name={title.title}
              >
                <div onClick={this.showTitleIssues}>
                  <img src={title.imageUrl} height="100" alt={title.title} />
                  <div>{title.title}</div>
                </div>
                <div onClick={this.fillTitle}>(fill title)</div>
              </Col>
            );
          })}
        </Row>
        <Row className="searchItems">
          {this.state.titleIssues.map((item) => {
            return (
              <Col md="1">
                <img
                  src={item.imageUrl}
                  data-id={item.id}
                  height="200px"
                  onClick={this.addIssueToPurchase}
                  alt={item.issueNum}
                />
                <div>{item.issueNum}</div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default IssueSearch;
