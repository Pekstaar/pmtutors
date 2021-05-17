export const makePayment = (payment, id) => {
    return (getState, dispatch, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        firestore.collection("payments")
            .doc(id)
            .set(payment)
            .then(() => dispatch({
                type: "PAYMENT_BUILD_SUCCESS"
            }))
            .catch(e => dispatch({
                type: "PAYMENT_BUILD_ERROR",
                error: e,
            }))
    }
}