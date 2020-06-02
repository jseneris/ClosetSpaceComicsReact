import React, { Component } from 'react';
import PurchaseModal from '../PurchaseModal/PurchaseModal';
import PurchaseItemList from '../PurchaseItemList/PurchaseItemList';
import IssueSearch from '../IssueSearch/IssueSearch';
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PurchaseList extends Component {
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
      purchaseItems: [],
      showPurchaseList: true,
      showSearch: false,
      showPurchaseDetail: false,
      showPurchaseIssues: false,
      searchTitles: [],
      titleIssues: [],
      dateSearch: closestDateString,
      page: 1,
      purchases: this.props.Purchases,
    };

    this.showPurchases = this.showPurchases.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleAddEditPurchase = this.handleAddEditPurchase.bind(this);
    this.handleAddIssueToPurchase = this.handleAddIssueToPurchase.bind(this);
    this.loadMorePurchase = this.loadMorePurchase.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.Purchases !== this.props.Purchases) {
      this.setState({ purchases: newProps.Purchases });
    }
  }

  showPurchases(event) {
    var target = event.target.closest('.purchaseDetail');
    var targetId = target.getAttribute('data-id');
    var targetPurchase = this.state.purchases.find((element) => {
      return element.id === parseInt(targetId);
    });

    this.setState({
      purchaseItems: targetPurchase.issues,
      description: targetPurchase.description,
      size: targetPurchase.size,
      price: targetPurchase.price,
      purchaseDate: targetPurchase.purchaseDate,
      activePurchaseId: targetId,
      showPurchaseIssues: true,
    });
  }

  loadMorePurchase(event) {
    ClosetSpaceComicsApi.getPurchases(
      this.props.UserId,
      this.state.page + 1
    ).then((response) => {
      this.setState({
        purchases: this.state.purchases.concat(response.Purchases),
        page: this.state.page + 1,
      });
    });
  }

  toggleSearch() {
    if (this.state.showSearch) {
      this.setState({
        showPurchaseList: true,
        showSearch: false,
        showPurchaseDetail: false,
        showPurchaseIssues: true,
      });
    } else {
      this.setState({
        showPurchaseList: false,
        showSearch: true,
        showPurchaseDetail: false,
        showPurchaseIssues: false,
      });
    }
  }

  handleAddEditPurchase(purchaseId, description, purchaseDate, price) {
    if (purchaseId) {
      ClosetSpaceComicsApi.editPurchase(
        this.props.UserId,
        purchaseId,
        description,
        purchaseDate,
        price
      ).then((editedPurchase) => {
        var targetIndex = this.props.Purchases.findIndex(
          (p) => p.id === parseInt(purchaseId)
        );
        this.props.Purchases[targetIndex].description = description;
        this.props.Purchases[targetIndex].purchaseDate = purchaseDate;
        this.props.Purchases[targetIndex].price = price;
        this.setState({
          description: description,
          purchaseDate: purchaseDate,
          price: price,
        });
      });
    } else {
      ClosetSpaceComicsApi.addPurchase(
        this.props.UserId,
        description,
        purchaseDate,
        price
      ).then((newPurchase) => {
        this.props.Purchases.unshift(newPurchase);
        this.setState({
          activePurchaseId: newPurchase.id,
          showPurchaseList: false,
          showSearch: true,
          showPurchaseIssues: false,
        });
      });
    }
  }

  handleAddIssueToPurchase(bookId) {
    ClosetSpaceComicsApi.addIssueToPurchase(
      this.props.UserId,
      this.state.activePurchaseId,
      bookId
    ).then((newIssue) => {
      var targetPurchase = this.props.Purchases.find((element) => {
        return element.id === parseInt(this.state.activePurchaseId);
      });
      targetPurchase.size++;
      targetPurchase.issues.unshift(newIssue);
      this.setState({
        purchaseItems: targetPurchase.issues,
        size: targetPurchase.size,
      });
    });
  }

  renderMoreButton() {
    if (this.state.page < this.props.TotalPages) {
      return (
        <Row>
          <Col md="12" className="text-center">
            <span onClick={this.loadMorePurchase}>More</span>
          </Col>
        </Row>
      );
    }
  }

  renderPurchaseList() {
    if (this.state.showPurchaseList) {
      return (
        <div>
          <Row className="purchaseTitle">
            <Col md={{ span: 1, offset: 11 }} className="addPurchaseBtn">
              <PurchaseModal
                UserId={this.props.UserId}
                PurchaseId={this.state.activePurchaseId}
                Description={this.state.description}
                Price={this.state.price}
                PurchaseDate={this.state.purchaseDate}
                HandleSaveButton={this.handleAddEditPurchase}
              />
            </Col>
          </Row>
          <Row className="purchases">
            {this.state.purchases.map((purchase) => {
              return (
                <Col
                  className={
                    'purchaseDetail clickable ' +
                    (this.state.activePurchaseId
                      ? purchase.id === parseInt(this.state.activePurchaseId)
                        ? ''
                        : 'inactive'
                      : '')
                  }
                  md="2"
                  sm="4"
                  xs="6"
                  data-id={purchase.id}
                  onClick={this.showPurchases}
                  key={purchase.id}
                >
                  <div className="text-center">
                    <div>
                      <img
                        className="purchase-image"
                        src={purchase.imageUrl}
                        alt={purchase.description}
                      />
                    </div>
                    <span>{purchase.description}</span>
                    <span>({purchase.size})</span>
                    <div>{purchase.purchaseDate}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
          {this.renderMoreButton()}
        </div>
      );
    }
  }

  renderSearch() {
    if (this.state.showSearch) {
      return (
        <IssueSearch
          PurchaseId={this.state.activePurchaseId}
          Description={this.state.description}
          Size={this.state.size}
          purchaseItems={this.state.purchaseItems}
          AddItems={this.handleAddIssueToPurchase}
          CloseSearch={this.toggleSearch}
        />
      );
    }
  }

  renderPurchaseItems() {
    if (this.state.showPurchaseIssues) {
      return (
        <PurchaseItemList
          PurchaseItems={this.state.purchaseItems}
          Description={this.state.description}
          Size={this.state.size}
          Price={this.state.price}
          PurchaseDate={this.state.purchaseDate}
          PurchaseId={this.state.activePurchaseId}
          Locations={this.props.Locations}
          HandleSaveButton={this.handleEditPurchase}
          ShowSearch={this.toggleSearch}
        />
      );
    }
  }

  render() {
    return (
      <div className="purchases">
        {this.renderPurchaseList()}
        {this.renderSearch()}
        {this.renderPurchaseItems()}
      </div>
    );
  }
}

export default PurchaseList;
