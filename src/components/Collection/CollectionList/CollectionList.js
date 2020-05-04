import React, {Component} from 'react';
import LocationModal from '../LocationModal/LocationModal'
import BoxList from '../BoxList/BoxList'
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
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

  handleAddEditLocation(locationId, description){
    if (locationId){
      ClosetSpaceComicsApi.editLocation(this.props.UserId, locationId, description)
        .then(editedPurchase => {
          var newLocations = this.state.locations.map(location => {
            if (location.id === parseInt(locationId)){
              location.name = description;
            }
            return location;
          });
          this.setState({locations: newLocations});
        });
    }
    else{
      ClosetSpaceComicsApi.addLocation(this.props.UserId, description)
        .then(newLocation => {
          this.state.locations.unshift(newLocation);
          this.setState({activeLocationId: newLocation.id, showBoxList: true, boxes: newLocation.boxes});
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
                <Col className={"locationDetail clickable " + (this.state.activeLocationId ? location.id === parseInt(this.state.activeLocationId) ? '': 'inactive' : '')} md="2" sm="3" xs="6" data-id={location.id} onClick={this.handleLocationSelect} key={location.id}>
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
        <BoxList UserId={this.props.UserId} LocationId={this.state.activeLocationId} Boxes={this.state.boxes} />
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
      </Container>
    );
  }
}

export default CollectionList;
