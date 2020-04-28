import React, {Component} from 'react';
import ClosetSpaceComicsApi from '../../../utils/ClosetSpaceComicsApi';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SortableItem = SortableElement(({value}) => {
  return (
    <Col className="issueDetail" md="2" sm="3" xs="6"  data-id={value.id} >
      <div>
        <img src={value.imageUrl} height="200px" alt={value.imageUrl}/>
      </div>
    </Col>
  )
});

const SortableList = SortableContainer(({items}) => {
  return (
    <Row className="issues">
      {items.map((value, index) => (
        <SortableItem key={`item-${value.id}`} index={index} value={value} />
      ))}
    </Row>
  );
});

class BoxItems extends Component {
  constructor(props){
    super(props);

    this.state = {
      items: this.props.BoxItems
    };
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    var oldBook = this.state.items[oldIndex];
    ClosetSpaceComicsApi.moveBook(0, oldBook.id, newIndex);
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));

  };

  render(){
    return(
      <div className="locationBoxHeader">
        <div>{this.props.LocationName}</div>
          <SortableList items={this.state.items} onSortEnd={this.onSortEnd} axis="xy" />;
      </div>
    );
  }
}
export default BoxItems;
