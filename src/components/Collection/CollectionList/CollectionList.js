import React, {Component} from 'react';
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CollectionList extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLocationList: true,
      showBoxList: false,
      showBoxItems: false
    };

    this.showLocationBoxes = this.showLocationBoxes.bind(this);
    this.showBoxIssues = this.showBoxIssues.bind(this);

    this.renderLocationList = this.renderLocationList.bind(this);
    this.renderBoxList = this.renderBoxList.bind(this);

  }

  showLocationBoxes(event){
    var target = event.target.closest(".locationDetail");
    var targetId = target.getAttribute('data-id');
    var targetLocation = this.props.locations.find(element => {
      return element.id == targetId;
    });

    this.setState({activeLocationId: targetId, locationName: targetLocation.name, boxes: targetLocation.boxes, showLocationList: false, showBoxList: true});
  }

  showBoxIssues(event){
    var target = event.target.closest(".boxDetail");
    var targetId = target.getAttribute('data-id');
    ClosetSpaceComicsApi.getBoxList(this.state.activeLocationId, targetId)
      .then(response => {
        this.setState({boxItems: response.items, showBoxList: false, showBoxItems: true});
      });
  }

  renderLocationList(){
    if (this.state.showLocationList){
      return(
        <div>
          <div className="locationHeader">
            <span>Locations</span>
          </div>
          <Row className="locationList">
            {this.props.locations.map(location => {
              return (
                <Col className="locationDetail" md="2" data-id={location.id} onClick={this.showLocationBoxes}>
                  <div>
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
          <div>{this.state.locationName}</div>
          <span>(edit)</span><span>(add)</span>
          <Row className="boxes">
            {this.state.boxes.map(box => {
              return (
                <Col className="boxDetail" md="2" data-id={box.id} onClick={this.showBoxIssues}>
                  <div>
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
        <div className="locationBoxHeader">
          <div>{this.state.locationName}</div>
          <Row className="issues">
            {this.state.boxItems.map(item => {
              return (
                <Col className="issueDetail" md="2" data-id={item.id} >
                  <div>
                    <img src={item.imageUrl} height="200px"/>
                  </div>
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
      <Container className="collectionList" fluid="true">
        {this.renderLocationList()}
        {this.renderBoxList()}
        {this.renderBoxItems()}
      </Container>
    );
  }

}

export default CollectionList;
