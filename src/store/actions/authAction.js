export const signIn = (creds) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore()

        firebase.auth().signInWithEmailAndPassword(
            creds.email,
            creds.password
        ).then((r) => {
            firestore.collection("clients").doc(r.user.uid).get()
                .then(doc => dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: doc.data()
                }))
        }).catch(e => {
            dispatch({ type: 'LOGIN_ERROR', error: e })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' });
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((r) => {
            return firestore.collection('clients').doc(r.user.uid).set({
                name: `${newUser.firstname} ${newUser.lastname}`,
                username: newUser.username,
                email: r.user.email,
                createdat: new Date(),
                level: "begginer",
                phonenumber: "",
                residence: "",
                about: "",
                skills: "",
                balance: "",
                study: "",
            })
                .then(() => dispatch({ type: "SIGNUP_SUCCESS" }))
        }).catch(e => {

            dispatch({ type: "SIGNUP_ERROR", error: e })

        });
    }
}