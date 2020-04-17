import React, {Component} from 'react';
import './App.css';
import logo from './logo125.png';
import banner from './banner.jpeg';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Catalog from './pages/Catalog';
import Purchases from './pages/Purchases';
import Collection from './pages/Collection';
import About from './pages/About';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authenticated:false,
      userId: 0,
      navCatalog: true,
      navPurchases: false,
      navCollection: false,
      navAbout: false,
    }

    this.displayCatalog = this.displayCatalog.bind(this);
    this.displayCollection = this.displayCollection.bind(this);
    this.displayPurchases = this.displayPurchases.bind(this);
    this.displayAbout = this.displayAbout.bind(this);
    this.renderCatalog = this.renderCatalog.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.renderPurchases = this.renderPurchases.bind(this);
    this.renderAbout = this.renderAbout.bind(this);
  }

  componentWillMount(){
    this.removeAuthListener = firebaseAppAuth.onAuthStateChanged((user) => {
      if (user){
        this.setState({authenticated: true, userId: user.uid});
      }
      else{
        this.setState({authenticated: true, userId: 0});
      }
    });
  }

  displayCatalog(){
    this.setState({navCatalog: true, navCollection: false, navPurchases:false, navAbout:false})
  }

  displayCollection(){
    this.setState({navCatalog: false, navCollection: true, navPurchases:false, navAbout:false})
  }

  displayPurchases(){
    this.setState({navCatalog: false, navCollection: false, navPurchases:true, navAbout:false})
  }

  displayAbout(){
    this.setState({navCatalog: false, navCollection: false, navPurchases:false, navAbout:true})
  }

  renderCatalog(){
    if (this.state.navCatalog)
    {
      return (
        <Catalog />
      );
    }
  }

  renderCollection(){
    if (this.state.navCollection)
    {
      return (
        <Collection authenticated={this.state.authenticated} userId={this.state.userId}/>
      );
    }
  }

  renderPurchases(){
    if (this.state.navPurchases)
    {
      return (
        <Purchases authenticated={this.state.authenticated} userId={this.state.userId}/>
      );
    }
  }

  renderAbout(){
    if (this.state.navAbout)
    {
      return (
        <About />
      );
    }
  }

  render(){
    const
    {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
        <Container className="App" fluid>
          <Row className="top-bar">
            <Col md="2">
              {user ? (
                <div>
                  {user.displayName}
                  <span>
                    (<a href="#" onClick={signOut}>sign out</a>)
                  </span>
                </div>
              )
                :
                <div>
                  Demo
                  <span>
                    (<a href="#" onClick={signInWithGoogle}>sign in</a>)
                  </span>
                </div>
              }
            </Col>
            <Col md="8">
                <img  className="logo" src={logo} alt="logo"/>
            </Col>
          </Row>
          <Row className="legend">
            <img className="title-big" src={banner} alt="banner"/>
          </Row>
          <Row className="justify-content-md-center">
              <Button className="nav-button" variant="outline-primary" active={this.state.navCatalog} onClick={this.displayCatalog}>Catalog</Button>
              <Button className="nav-button" variant="outline-primary" active={this.state.navCollection} onClick={this.displayCollection}>Collection</Button>
              <Button className="nav-button" variant="outline-primary" active={this.state.navPurchases} onClick={this.displayPurchases}>Purchases</Button>
              <Button className="nav-button" variant="outline-primary" active={this.state.navAbout} onClick={this.displayAbout}>About</Button>
          </Row>
          <div>
            {this.renderCatalog()}
            {this.renderCollection()}
            {this.renderPurchases()}
            {this.renderAbout()}
          </div>
      </Container>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

//export default App;
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
