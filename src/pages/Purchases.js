import React, {Component} from 'react';
import PurchaseList from '../components/Purchases/PurchaseList/PurchaseList';

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
    ClosetSpaceComicsApi.getPurchases(this.props.userId).then(response => {
      this.setState({purchaseList: response.Purchases, loaded: true, refresh: false});
    });
//    if (this.issueListElement != null ){
//      if (this.issueListElement.current != null){
//        if (this.issueListElement.current.resetFilter != null){
//          this.issueListElement.current.resetFilter();
//        }
//      }
//    }
  }


  render(){
    if ((this.state.loaded && this.state.refresh) || (!this.state.loaded && this.props.authenticated)){
      this.getPurchaseList();
    }

    if (this.state.loaded && this.props.authenticated){
    return (
      <div className="App">
        <div className="container-fluid">
          <PurchaseList purchases={this.state.purchaseList} ref={this.issueListElement} userId={this.props.userId}/>
        </div>
      </div>
    );
    }
    else{
        return(
          <div>loading</div>
        )
    }
  }
}

export default Purchases
