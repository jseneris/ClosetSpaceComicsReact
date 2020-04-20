import React, {Component} from 'react';
import PurchaseList from '../components/Purchases/PurchaseList/PurchaseList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class Purchases extends Component {
  constructor(props){
    super(props);

    this.state = {
      purchaseList: [],
      loaded: false,
      refresh: false
    };

    this.getPurchaseList = this.getPurchaseList.bind(this);
  }

  componentWillReceiveProps (newProps) {
    if( newProps.UserId !== this.props.UserId ){
      this.setState({refresh: true});
    }
  }

  getPurchaseList(){
    if (this.state.loaded){
      this.setState({loaded:false, purchaseList:[]});
    }
    ClosetSpaceComicsApi.getPurchases(this.props.UserId).then(response => {
      this.setState({purchaseList: response.Purchases, loaded: true, refresh: false});
    });
  }

  render(){
    if ((this.state.loaded && this.state.refresh) || (!this.state.loaded && this.props.Authenticated)){
      this.getPurchaseList();
    }

    if (this.state.loaded && this.props.Authenticated){
      return (
        <PurchaseList Purchases={this.state.purchaseList} UserId={this.props.UserId}/>
      );
    }
    else{
      return(
        <Row className="purchaseTitle">
          <Col md="12" className="text-center purchaseHeader">loading</Col>
        </Row>
      )
    }
  }
}

export default Purchases
