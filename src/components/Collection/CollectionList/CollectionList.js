import React, {Component} from 'react';
import BoxItems from '../BoxItems/BoxItems'
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CollectionList.css';

class CollectionList extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLocationList: true,
      showBoxList: false,
      showBoxItems: false,
      locations: props.locations
    };

    this.showLocationBoxes = this.showLocationBoxes.bind(this);
    this.showBoxIssues = this.showBoxIssues.bind(this);

    this.renderLocationList = this.renderLocationList.bind(this);
    this.renderBoxList = this.renderBoxList.bind(this);

  }

  componentWillReceiveProps (newProps) {
    if( newProps.locations !== this.props.locations ){
      this.setState({locations: newProps.locations});
    }
  }

  showLocationBoxes(event){
    var target = event.target.closest(".locationDetail");
    var targetId = target.getAttribute('data-id');
    var targetLocation = this.props.locations.find(element => {
      return element.id === parseInt(targetId);
    });

    this.setState({activeLocationId: targetId, locationName: targetLocation.name, boxes: targetLocation.boxes, showLocationList: false, showBoxList: true});
  }

  showBoxIssues(event){
    var target = event.target.closest(".boxDetail");
    var targetId = target.getAttribute('data-id');
    ClosetSpaceComicsApi.getBoxList(this.props.UserId, this.state.activeLocationId, targetId)
      .then(response => {
        this.setState({boxItems: response.items, showBoxList: false, showBoxItems: true});
      });
  }

  renderLocationList(){
    if (this.state.showLocationList){
      return(
        <div>
          <Row className="locationList">
            {this.state.locations.map(location => {
              return (
                <Col className="locationDetail clickable" md="2" data-id={location.id} onClick={this.showLocationBoxes} key={location.id}>
                  <div className="text-center">
                    <div>
                      <img className="locationImage" src={location.imageUrl} alt={location.name} />
                    </div>
                    <span>{location.name}</span>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      )
    }
  }

  renderBoxList(){
    if (this.state.showBoxList){
      return(
        <div className="locationBoxHeader">
          <Row>
            <Col md={{offset:1, span:10}} className="boxHeader text-center">{this.state.locationName}</Col>
            <Col md={{span:1}} className="addPurchaseBtn">
              <FontAwesomeIcon icon={faPenSquare} className="clickable" />
              <FontAwesomeIcon icon={faPlusCircle} className="clickable" />
            </Col>
          </Row>
          <Row className="boxes">
            {this.state.boxes.map(box => {
              return (
                <Col className="boxDetail clickable" md="2" data-id={box.id} onClick={this.showBoxIssues} key={box.id}>
                  <div className="text-center">
                    <div>
                      <img className="boxImage" src={box.imageUrl} alt={box.name} />
                    </div>
                    <span>{box.name}</span>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      )
    }
  }

  renderBoxItems(){
    if (this.state.showBoxItems){
      return(
        <BoxItems LocationName={this.state.locationName} BoxItems={this.state.boxItems} />
      )
    }

  }

  render(){
    return(
      <Container className="collectionList" fluid="true">
        <div className="locationHeader">
          <Row className="locationTitle">
            <Col md={{span:1, offset:11}} className="addPurchaseBtn" onClick={this.showPurchaseAdd}><FontAwesomeIcon icon={faPlusCircle} className="clickable"/></Col>
          </Row>
        </div>
        {this.renderLocationList()}
        {this.renderBoxList()}
        {this.renderBoxItems()}
      </Container>
    );
  }

}

export default CollectionList;
