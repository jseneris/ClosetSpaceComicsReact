import React, {Component} from 'react';
import BoxItems from '../BoxItems/BoxItems'
import LocationModal from '../LocationModal/LocationModal'
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
      locations: props.Locations
    };

    this.showBoxIssues = this.showBoxIssues.bind(this);

    this.renderLocationList = this.renderLocationList.bind(this);
    this.renderBoxList = this.renderBoxList.bind(this);

    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleAddNewLocation = this.handleAddNewLocation.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if( newProps.locations !== this.props.locations ){
      this.setState({locations: newProps.locations});
    }
  }

  handleLocationSelect(event){
    var target = event.target.closest(".locationDetail");
    var targetId = target.getAttribute('data-id');
    var targetLocation = this.state.locations.find(element => {
      return element.id === parseInt(targetId);
    });

    this.setState({activeLocationId: targetId, locationName: targetLocation.name, boxes: targetLocation.boxes, showLocationList: true, showBoxList: true});
  }

  showBoxIssues(event){
    var target = event.target.closest(".boxDetail");
    var targetId = target.getAttribute('data-id');
    ClosetSpaceComicsApi.getBoxList(this.props.UserId, this.state.activeLocationId, targetId)
      .then(response => {
        this.setState({boxItems: response.items, showBoxList: false, showBoxItems: true});
      });
  }

  handleAddNewLocation(description){
    ClosetSpaceComicsApi.addLocation(this.props.UserId, description)
      .then(newLocation => {
        this.state.locations.unshift(newLocation);
        this.setState({activeLocationId: newLocation.id});
      });
  }

  handleEditLocation(locationId, description){
    ClosetSpaceComicsApi.editPurchase(this.props.UserId, locationId, description)
      .then(editedPurchase => {
        var targetIndex = this.props.Locations.findIndex(p => p.id === parseInt(locationId));
        this.props.Locations[targetIndex].description = description;
        this.setState({description: description});
      });
  }

  renderLocationList(){
    if (this.state.showLocationList){
      return(
        <div>
          <Row className="locationList">
            {this.state.locations.map(location => {
              return (
                <Col className={"locationDetail clickable " + (this.state.activeLocationId ? location.id === parseInt(this.state.activeLocationId) ? '': 'inactive' : '')} md="2" data-id={location.id} onClick={this.handleLocationSelect} key={location.id}>
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
            <Col md={{span:1, offset:11}} className="addPurchaseBtn">
              <LocationModal UserId={this.props.UserId} LocationId={this.state.activeLocationId}  LocationName={this.state.locationName} HandleSaveButton={this.handleAddNewLocation}/>
            </Col>
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
