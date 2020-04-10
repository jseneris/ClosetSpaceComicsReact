import React, {Component} from 'react';
import CollectionList from '../components/Collection/CollectionList/CollectionList';
import App from '../App';

//import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class Collection extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
      loaded: false,
      refresh: false
    };

    this.getCollectionList = this.getCollectionList.bind(this);
    this.issueListElement = React.createRef();
  }

  componentDidMount(){
//    this.getCollectionList();
  }

  componentWillReceiveProps (newProps) {
  if( newProps.userId !== this.props.userId ){
    this.setState({refresh: true});
  }
}

  getCollectionList(){
    ClosetSpaceComicsApi.getCollections(this.props.userId).then(response => {
      this.setState({locations: response.locations, loaded: true, refresh: false});
    });
  }

  render(){
    if ((this.state.loaded && this.state.refresh) || (!this.state.loaded && this.props.authenticated)){
      this.getCollectionList();
    }

    if (this.state.loaded && this.props.authenticated){
      return (
        <div className="App">
          <div className="container-fluid">
              <CollectionList locations={this.state.locations} ref={this.issueListElement} userId={this.props.userId} />
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

export default Collection
