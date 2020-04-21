import React, {Component} from 'react';
import PurchaseModal from '../PurchaseModal/PurchaseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PurchaseItemList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="purchaseItems">
        <Row>
          <Col md={{offset:1, span:10}} className="purchaseItemsHeader text-center">{this.props.Description}<span>({this.props.Size})</span></Col>
          <Col md={{span:1}} >
            <PurchaseModal UserId={this.props.UserId} PurchaseId={this.props.PurchaseId} Description={this.props.Description} Price={this.props.Price} PurchaseDate={this.props.PurchaseDate} HandleSaveButton={this.props.HandleSaveButton}/>
            <FontAwesomeIcon icon={faPlusCircle} className="clickable addEditButton" onClick={this.props.ShowSearch}/>
          </Col>
        </Row>
        <Row className="items">
          {this.props.PurchaseItems.map(item => {
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

export default PurchaseItemList;
