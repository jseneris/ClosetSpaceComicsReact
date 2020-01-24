import React, {Component} from 'react';
import './App.css';
import Main from './pages/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

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
        this.setState({authenticated: true, userId: 1});
      }
      else{
        console.log('no user');
        this.setState({authenticated: true, userId: 0});
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
          <button onClick={signInWithGoogle}>Sign in with Google</button>}
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
