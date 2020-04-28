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

    this.handleBoxSelect = this.handleBoxSelect.bind(this);
    this.handleAddEditBox = this.handleAddEditBox.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if( newProps.Boxes !== this.props.Boxes ){
      this.setState({boxes: newProps.Boxes});
    }
  }

  handleBoxSelect(event){
    var target = event.target.closest(".boxDetail");
    var targetId = target.getAttribute('data-id');
    var targetBox = this.state.boxes.find(element => {
      return element.id === parseInt(targetId);
    });
    ClosetSpaceComicsApi.getBoxList(this.props.UserId, this.props.LocationId, targetId)
      .then(response => {
        this.setState({activeBoxId: targetId, boxName: targetBox.name, boxItems: response.items, showBoxItems: true});
      });
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
          this.state.boxes.push(newBox);
          this.setState({activeBoxId: newBox.id});
        });
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
      <div className="locationBoxHeader">
        <Row>
          <Col md={{offset:1, span:10}} className="boxHeader text-center">{this.state.boxName}</Col>
          <Col md={{span:1}} className="addPurchaseBtn">
            <BoxModal UserId={this.props.UserId} BoxId={this.state.activeBoxId} BoxName={this.state.boxName} HandleSaveButton={this.handleAddEditBox}/>
          </Col>
        </Row>
        <Row className="boxes">
          {this.state.boxes.map(box => {
            return (
              <Col className={"boxDetail clickable" + (this.state.activeBoxId ? box.id === parseInt(this.state.activeBoxId) ? '': 'inactive' : '')} md="2" data-id={box.id} onClick={this.handleBoxSelect} key={box.id}>
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
        {this.renderBoxItems()}
      </div>
    )
  }

}

export default BoxList;
