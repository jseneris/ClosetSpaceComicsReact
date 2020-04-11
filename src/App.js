import React, {Component} from 'react';
import './App.css';
import Main from './pages/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import logo from './logo125.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      authenticated:false,
      userId: 0
    }
  }

  componentWillMount(){
    this.removeAuthListener = firebaseAppAuth.onAuthStateChanged((user) => {
      if (user){
        console.log(user.uid);
        this.setState({authenticated: true, userId: user.uid});
      }
      else{
        console.log('no user');
        this.setState({authenticated: true, userId: null});
      }
    });
    console.log("no auth change yet");
  }

  render(){
    const
    {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        <div className="container-fluid">
          <Row className="top-bar">
            <Col md="2">
              <div>
                <ul>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/purchases'>Purchase List</Link></li>
                  <li><Link to='/collection'>Collection</Link></li>
                  <li><Link to='/collectionbytitle'>Collection By Title</Link></li>
                  <li><Link to='/about'>About</Link></li>
                </ul>
              </div>
            </Col>
            <Col md="8">
                <img  className="logo" src={logo} alt="logo"/>
            </Col>
            <Col md="2">
              {user ?
                <p>Hello, {user.displayName}</p>
               :
                <p>Please sign in.</p>}

              {user ? (
                <div>
                  <button onClick={signOut}>Sign out</button>
                </div>
              )
                :
                <div>
                  <button onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
              }

            </Col>
          </Row>
        </div>
        <Main authenticated={this.state.authenticated} userId={this.state.userId}/>
      </div>
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
