import React, {Component} from 'react';
import CollectionList from '../components/CollectionByTitle/CollectionList/CollectionList';

//import IssueList from '../components/Catalog/IssueList/IssueList';
import ClosetSpaceComicsApi from '../utils/ClosetSpaceComicsApi';

class CollectionByTitle extends Component {
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
    if( newProps.UserId !== this.props.UserId ){
      this.setState({refresh: true});
    }
  }

  getCollectionList(){
    ClosetSpaceComicsApi.getCollections(this.props.UserId).then(response => {
      this.setState({locations: response.locations, loaded: true, refresh: false});
    });
  }

  render(){
    if ((this.state.loaded && this.state.refresh) || (!this.state.loaded && this.props.Authenticated)){
      this.getCollectionList();
    }

    if (this.state.loaded && this.props.Authenticated){
      return (
        <div className="App">
          <div className="container-fluid">
              <CollectionList locations={this.state.locations} ref={this.issueListElement} UserId={this.props.UserId} />
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

export default CollectionByTitle
