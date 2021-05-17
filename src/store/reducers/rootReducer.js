import { combineReducers } from 'redux'
import authReducer from './authReducer';
import jobReducer from './jobReducer';
import vetReducer from './vetReducer';
import clientReducer from './clientReducer';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import PaymentReducer from './paymentReducer';

const rootReducer = combineReducers({

    job: jobReducer,

    auth: authReducer,

    vet: vetReducer,

    client: clientReducer,

    firebase: firebaseReducer,

    firestore: firestoreReducer,

    payment: PaymentReducer,

})

export default rootReducer;