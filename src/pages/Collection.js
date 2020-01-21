import React, {Component} from 'react';
import logo from '../logo125.png';
import CollectionList from '../components/Collection/CollectionList/CollectionList';

//import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class Collection extends Component {
  constructor(props){
    super(props);

    this.state = {locations: []};

    this.getCollectionList = this.getCollectionList.bind(this);
    this.issueListElement = React.createRef();
  }

  componentDidMount(){
    this.getCollectionList();
  }

  getCollectionList(){
    ClosetSpaceComicsApi.getCollections().then(response => {
      this.setState({locations: response.locations});
    });
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
            <CollectionList locations={this.state.locations} ref={this.issueListElement} />
          </div>
      </div>
    );
  }

}

export default Collection
