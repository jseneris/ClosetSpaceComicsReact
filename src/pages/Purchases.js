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
    this.issueListElement = React.createRef();
  }

  componentDidMount(){
    //this.getPurchaseList();
  }

  componentWillReceiveProps (newProps) {
    if( newProps.userId !== this.props.userId ){
      this.setState({refresh: true});
    }
  }

  getPurchaseList(){
    if (this.state.loaded){
      this.setState({loaded:false, purchaseList:[]});
    }
    ClosetSpaceComicsApi.getPurchases(this.props.userId).then(response => {
      this.setState({purchaseList: response.Purchases, loaded: true, refresh: false});
    });
  }

  render(){
    if ((this.state.loaded && this.state.refresh) || (!this.state.loaded && this.props.authenticated)){
      this.getPurchaseList();
    }

    if (this.state.loaded && this.props.authenticated){
      return (
        <PurchaseList purchases={this.state.purchaseList} ref={this.issueListElement} userId={this.props.userId}/>
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
