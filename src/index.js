import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { reduxFirestore,createFirestoreInstance } from 'redux-firestore'
import {BrowserRouter} from 'react-router-dom'
import firebase from './config/fbConfig'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import ScaleLoader from "react-spinners/ScaleLoader";

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div style={{
    display:"grid",
    height:"100vh",
    width:"100%",
    placeItems:"center"
  }}><ScaleLoader color={"royalblue"} loading={isLoaded} height={70} width={10} />
   </div>
  return children
}


const config = {
  attachAuthIsReady: true, // attaches auth is ready promise to store // should match the reducer name ('firebase' is default)
}

const store = createStore(rootReducer,
  compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase})),
      reduxFirestore(firebase)
    )
  ); 

const rrfProps = {
  firebase,
  config: {config},
  dispatch: store.dispatch,
  createFirestoreInstance
}

 
  ReactDOM.render(
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
            <AuthIsLoaded>
              <App />
            </AuthIsLoaded>
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>,
    document.getElementById('root')
  );

  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

