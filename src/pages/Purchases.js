import React, {Component} from 'react';
import logo from '../logo125.png';
import PurchaseList from '../components/Purchases/PurchaseList/PurchaseList';

//import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class Purchases extends Component {
  constructor(props){
    super(props);

    this.state = {purchaseList: []};

    this.getPurchaseList = this.getPurchaseList.bind(this);
    this.issueListElement = React.createRef();
  }

  componentDidMount(){
    this.getPurchaseList();
  }

  getPurchaseList(){
    ClosetSpaceComicsApi.getPurchases().then(response => {
      this.setState({purchaseList: response.Purchases});
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
    return (
      <div className="App">
        <div className="container-fluid">
            <div className="legend">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <PurchaseList purchases={this.state.purchaseList} ref={this.issueListElement} />
          </div>
      </div>
    );
  }

}

export default Purchases
