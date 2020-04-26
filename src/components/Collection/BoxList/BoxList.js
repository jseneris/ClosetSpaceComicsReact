import React, {Component} from 'react';
import BoxItems from '../BoxItems/BoxItems'
import BoxModal from '../BoxModal/BoxModal'
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class BoxList extends Component {
  constructor(props){
    super(props);
    this.state = {
      boxes: props.Boxes
    };

    this.handleAddEditBox = this.handleAddEditBox.bind(this);

  }

  handleAddEditBox(boxId, name){
    if (boxId){
      ClosetSpaceComicsApi.editBox(this.props.UserId, this.props.LocationId, boxId, name)
        .then(editedBox => {
          var targetIndex = this.props.Boxes.findIndex(p => p.id === parseInt(boxId));
          this.props.Boxes[targetIndex].name = name;
          this.setState({name: name});
        });
    }
    else{
      ClosetSpaceComicsApi.addBox(this.props.UserId, this.props.LocationId, name)
        .then(newBox => {
          this.state.boxes.unshift(newBox);
          this.setState({activeBoxId: newBox.id});
        });
    }
  }

  render(){
    return(
      <div className="locationBoxHeader">
        <Row>
          <Col md={{offset:1, span:10}} className="boxHeader text-center">{this.state.locationName}</Col>
          <Col md={{span:1}} className="addPurchaseBtn">
            <BoxModal UserId={this.props.UserId} BoxId={this.state.activeBoxId} BoxName={this.state.locationName} HandleSaveButton={this.handleAddEditBox}/>
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

export default BoxList;
