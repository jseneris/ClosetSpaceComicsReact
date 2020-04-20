import React, {Component} from 'react';
import PurchaseModal from './PurchaseModal';
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PurchaseList.css';

class PurchaseList extends Component {
  constructor(props){
    super(props);

    let currentDate = new Date();
    let dayOffset = currentDate.getDay();
    if (dayOffset < 3){
      dayOffset += 7;
    }
    let closestWed = new Date(new Date().setDate(currentDate.getDate() - dayOffset + 3));
    let closestDateString = (closestWed.getMonth()+1) + '/' + closestWed.getDate() + '/' + closestWed.getFullYear();

    this.state = {
      purchaseItems: [],
      description: "",
      purchaseDate: "",
      price: "",
      showPurchaseList: true,
      showSearch: false,
      showPurchaseDetail: false,
      showPurchaseIssues: false,
      searchTitles: [],
      titleIssues: [],
      dateSearch:closestDateString,
      page: 1,
      purchases: props.Purchases
    };

    this.handleDateChange = this.handleDateChange.bind(this);

    this.showPurchases = this.showPurchases.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.searchByDate = this.searchByDate.bind(this);
    this.showTitleIssues = this.showTitleIssues.bind(this);
    this.fillTitle = this.fillTitle.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleAddNewPurchase = this.handleAddNewPurchase.bind(this);
    this.addIssueToPurchase = this.addIssueToPurchase.bind(this);
    this.showPurchaseAdd = this.showPurchaseAdd.bind(this);
    this.closePurchaseDetail = this.closePurchaseDetail.bind(this);
    this.loadMorePurchase = this.loadMorePurchase.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if( newProps.Purchases !== this.props.Purchases ){
      this.setState({purchases: newProps.Purchases});
    }
  }

  renderSortByOptions() {
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
      return <option key={closestWedDate} value={closestWedDate}>{closestWedDate}</option>;
    });
  }

  showPurchases(event){
    var target = event.target.closest(".purchaseDetail");
    var targetId = target.getAttribute('data-id');
    var targetPurchase = this.state.purchases.find(element => {
      return element.id === parseInt(targetId);
    });

    this.setState({
      purchaseItems: targetPurchase.issues,
      description: targetPurchase.description,
      size: targetPurchase.size,
      activePurchaseId: targetId,
      showPurchaseIssues: true
    });
  }

  addIssueToPurchase(event){
    var targetId = event.target.getAttribute('data-id');
    ClosetSpaceComicsApi.addIssueToPurchase(this.props.UserId, this.state.activePurchaseId, targetId)
    .then(newIssue => {
      var targetPurchase = this.props.Purchases.find(element => {
        return element.id === this.state.activePurchaseId;
      });
      targetPurchase.size++;
      targetPurchase.issues.unshift(newIssue);
      this.setState({
        purchaseItems: targetPurchase.issues,
        size: targetPurchase.size
      });
    });
  }

  searchByTitle(event){
    var target = document.getElementById("txtSearch");

    ClosetSpaceComicsApi.searchByTitle(target.value).then(response => {
      this.setState({searchTitles: response.Titles});
    });
  }

  handleDateChange(event){
    this.setState({dateSearch: event.target.value});
  }

  searchByDate(event){
    ClosetSpaceComicsApi.searchByDate(this.state.dateSearch).then(response => {
      this.setState({titleIssues: response.Issues});
    });
  }

  showTitleIssues(event){
    var target = event.target.closest(".title");
    var targetId = target.getAttribute('data-name');
    var targetPurchase = this.state.searchTitles.find(element => {
      return element.title === targetId;
    });

    this.setState({titleIssues: targetPurchase.issues});
  }

  fillTitle(event){
    var target = event.target.closest(".title");
    var targetId = target.getAttribute('data-id');
    ClosetSpaceComicsApi.fillTitle(targetId).then(response => {
      var target = document.getElementById("txtSearch");

      ClosetSpaceComicsApi.searchByTitle(target.value).then(response => {
        this.setState({searchTitles: response.Titles});
      });
    });
  }

  loadMorePurchase(event){
    ClosetSpaceComicsApi.getPurchases(this.props.UserId, this.state.page+1).then(response => {
      this.setState({purchases: this.state.purchases.concat(response.Purchases), page: this.state.page+1});
    });
  }

  showPurchaseAdd(){
    var nowDate = new Date();
    var date = (nowDate.getMonth()+1) +'/'+ nowDate.getDate() +'/'+ nowDate.getFullYear();
    this.setState({
      showPurchaseList: false,
      showSearch: false,
      showPurchaseDetail: true,
      showPurchaseIssues: false,
      description: "New Purchase",
      purchaseDate: date,
      price: "$0.00"
    });
  }

  toggleSearch(){
    if (this.state.showSearch){
      this.setState({
        showPurchaseList: true,
        showSearch: false,
        showPurchaseDetail: false,
        showPurchaseIssues: true,
      });
    }
    else{
      this.setState({
        showPurchaseList: false,
        showSearch: true,
        showPurchaseDetail: false,
        showPurchaseIssues: false,
      });
    }
  }

  closePurchaseDetail(){
    this.setState({
      showPurchaseList: true,
      showSearch: false,
      showPurchaseDetail: false,
      showPurchaseIssues: false,
    });
  }

  handleAddNewPurchase(description, purchaseDate,price){
    ClosetSpaceComicsApi.addPurchase(this.props.UserId, null, description, purchaseDate, price)
      .then(newPurchase => {
        this.props.Purchases.unshift(newPurchase);
        this.setState({activePurchaseId: newPurchase.id, showPurchaseList: false, showSearch:true});
      });
  }

  renderPurchaseList(){
    if (this.state.showPurchaseList){
      return(
        <div>
          <Row className="purchaseTitle">
            <Col md={{span:1, offset:11}} className="addPurchaseBtn">
              <PurchaseModal UserId={this.props.UserId} Description={this.state.description} PurchaseDate={this.state.purchaseDate} Price={this.state.price} HandleAddNewPurchase={this.handleAddNewPurchase}/>
            </Col>
          </Row>
          <Row className="purchases">
            {this.state.purchases.map(purchase => {
              return (
                <Col className="purchaseDetail clickable" md="2" sm="4" xs="6" data-id={purchase.id} onClick={this.showPurchases} key={purchase.id}>
                  <div className="text-center">
                    <div>
                      <img className="purchaseImage" src={purchase.imageUrl} alt={purchase.description} />
                    </div>
                    <span>{purchase.description}</span><span>({purchase.size})</span>
                    <div>{purchase.purchaseDate}</div>
                  </div>
                </Col>
              )
            })}
          </Row>
          <Row>
            <Col md="12" className="text-center"><span onClick={this.loadMorePurchase}>More</span></Col>
          </Row>
        </div>
      )
    }
  }

  renderSearch(){
    if (this.state.showSearch){
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
            { this.renderSortByOptions()}
          </select>
          <button onClick={this.searchByDate}>Search</button>
        </Row>
          <Row className="searchTitles">
          {this.state.searchTitles.map(title => {
            return (
              <Col className="title" md="1" data-id={title.id} data-name={title.title}>
                <div onClick={this.showTitleIssues}>
                  <img src={title.imageUrl} height="100" alt={title.title}/>
                  <div>{title.title}</div>
                </div>
                <div onClick={this.fillTitle}>(fill title)</div>
              </Col>
            )
          })}
          </Row>
          <Row className="searchItems">
            {this.state.titleIssues.map(item => {
              return (
                <Col md="1" >
                  <img src={item.imageUrl} data-id={item.id} height="200px" onClick={this.addIssueToPurchase} alt={item.issueNum}/>
                  <div>{item.issueNum}</div>
                </Col>
              )
            })}
          </Row>
        </div>
      );
    }
  }

  renderPurchaseItems(){
    if (this.state.showPurchaseIssues){
      return(
        <div className="purchaseItems">
          <Row>
            <Col md={{offset:1, span:10}} className="purchaseItemsHeader text-center">{this.state.description}<span>({this.state.size})</span></Col>
            <Col md={{span:1}} className="addPurchaseBtn">
              <FontAwesomeIcon icon={faPenSquare} className="clickable" />
              <FontAwesomeIcon icon={faPlusCircle} className="clickable" onClick={this.toggleSearch}/>
            </Col>
          </Row>
          <Row className="items">
            {this.state.purchaseItems.map(item => {
              return (
                <Col md="1" sm="3" xs="4" >
                  <img src={item.imageUrl} height="200px" alt={item.title}/>
                </Col>
              )
            })}
          </Row>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="purchases">
        {this.renderPurchaseList()}
        {this.renderSearch()}
        {this.renderPurchaseItems()}
      </div>
    );
  }
}

export default PurchaseList;
