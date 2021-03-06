import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LocationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      description: this.props.LocationName,
      title: 'Add Location',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    this.handleSaveButton = this.handleSaveButton.bind(this);

    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(event) {
    if (event.target.classList.contains('addButton')) {
      this.setState({
        show: true,
        description: '',
        title: 'Add Location',
        action: 'add',
      });
    } else if (event.target.classList.contains('editButton')) {
      this.setState({
        show: true,
        description: this.props.LocationName,
        title: 'Edit Location',
        action: 'edit',
      });
    }
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSaveButton() {
    if (this.state.action === 'edit') {
      this.props.HandleSaveButton(
        this.props.LocationId,
        this.state.description
      );
    } else {
      this.props.HandleSaveButton('', this.state.description);
    }
    this.handleClose();
  }

  renderEditButton() {
    if (this.props.LocationId) {
      return (
        <span
          className="clickable btn-add-edit editButton"
          onClick={this.handleShow}
        >
          <FontAwesomeIcon className="not-event" icon={faPenSquare} />
        </span>
      );
    }
  }

  renderAddButton() {
    return (
      <span
        className="clickable btn-add-edit addButton"
        onClick={this.handleShow}
      >
        <FontAwesomeIcon className="not-event" icon={faPlusCircle} />
      </span>
    );
  }

  render() {
    return (
      <>
        {this.renderEditButton()}
        {this.renderAddButton()}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span>Description:</span>
              <span>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </span>
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

export default LocationModal;
