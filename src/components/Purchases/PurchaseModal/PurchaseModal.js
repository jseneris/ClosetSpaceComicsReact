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
    this.handleShow = this.handleShow.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);

    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);

  }

  handleShow(event){
    if(event.target.classList.contains('addButton'))
    {
      this.setState({show:true, description: '', price: '', purchaseDate: '', title: 'Add Purchase', action: 'add'});
    }
    else if(event.target.classList.contains('editButton'))
    {
      this.setState({show:true, description: this.props.Description, price: this.props.Price, purchaseDate: this.props.PurchaseDate, title:'Edit Purchase', action:'edit'});
    }
  }

  handleClose(){
    this.setState({show:false});
  }

  handleSaveButton(){
    if (this.props.PurchaseId){
      this.props.HandleSaveButton(this.props.PurchaseId, this.state.description, this.state.purchaseDate, this.state.price);
    }
    else{
      this.props.HandleSaveButton('', this.state.description, this.state.purchaseDate, this.state.price);
    }
    this.handleClose();
  }

  renderEditButton(){
    if (this.props.PurchaseId){
      return (
        <span className="clickable addEditButton editButton" onClick={this.handleShow}>
          <FontAwesomeIcon className="notEvent" icon={faPenSquare}/>
        </span>
      );
    }
  }

  renderAddButton(){
    return (
      <span className="clickable addEditButton addButton" onClick={this.handleShow}>
        <FontAwesomeIcon className="notEvent" icon={faPlusCircle}  />
      </span  >
    );
  }

  render(){
    return (
      <>
        {this.renderEditButton()}
        {this.renderAddButton()}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Purchase</Modal.Title>
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
