import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class PurchaseModal extends Component {
  constructor(props){
    super(props);

    let nowDate = new Date();
    let date = (nowDate.getMonth()+1) +'/'+ nowDate.getDate() +'/'+ nowDate.getFullYear();
    let useDate = this.props.PurchaseDate ? this.props.PurchaseDate : date;

    this.state = {
      show: false,
      description: this.props.Description,
      purchaseDate: useDate,
      price: this.props.Price,
      icon: this.props.PurchaseId ? faPenSquare : faPlusCircle
    };

    this.handleClose = this.handleClose.bind(this);

    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  handleClose(){
    this.setState({show:false});
  }

  handleSaveButton(){
    if (this.props.PurchaseId){
      this.props.HandleSaveButton(this.props.PurchaseId, this.state.description, this.state.purchaseDate, this.state.price);
    }
    else{
      this.props.HandleSaveButton(this.state.description, this.state.purchaseDate, this.state.price);
    }
    this.handleClose();
  }

  render(){
    return (
      <>
        <FontAwesomeIcon icon={this.state.icon} className="clickable addEditButton" onClick={e => this.setState({show:true})}/>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span>Description:</span><span><input type="text" name="despcription" id="despcription" value={this.state.description} onChange={e => this.setState({'description': e.target.value })}/></span>
            </div>
            <div>
              <span>Price:</span><span><input type="text" name="price" id="price" value={this.state.price} onChange={e => this.setState({'price': e.target.value })}/></span>
            </div>
            <div>
              <span>Date:</span><span><input type="text" name="purchaseDate" id="purchaseDate" value={this.state.purchaseDate} onChange={e => this.setState({'purchaseDate': e.target.value })}/></span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSaveButton}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default PurchaseModal;
