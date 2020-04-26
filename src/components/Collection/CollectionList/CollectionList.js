import React, {Component} from 'react';
import BoxItems from '../BoxItems/BoxItems'
import LocationModal from '../LocationModal/LocationModal'
import BoxList from '../BoxList/BoxList'
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    this.handleAddEditLocation = this.handleAddEditLocation.bind(this);
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

  handleAddEditLocation(locationId, description){
    if (locationId){
      ClosetSpaceComicsApi.editLocation(this.props.UserId, locationId, description)
        .then(editedPurchase => {
          var targetIndex = this.state.locations.findIndex(p => p.id === parseInt(locationId));
          this.state.locations[targetIndex].name = description;
          this.setState({locations: this.state.locations});
        });
    }
    else{
      ClosetSpaceComicsApi.addLocation(this.props.UserId, description)
        .then(newLocation => {
          this.state.locations.unshift(newLocation);
          this.setState({activeLocationId: newLocation.id});
        });
    }
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
        <BoxList LocationId={this.state.activeLocationId} Boxes={this.state.boxes} />
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
              <LocationModal UserId={this.props.UserId} LocationId={this.state.activeLocationId}  LocationName={this.state.locationName} HandleSaveButton={this.handleAddEditLocation}/>
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
