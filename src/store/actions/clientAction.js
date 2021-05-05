
export const updateProfile = (id, data) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore()

        firestore.collection("clients").doc(id).update(data)
            .then(() => dispatch({ type: "PROFILE_UPDATE_SUCCESS" }))
            .catch(e => dispatch({ type: "PROFILE_UPDATE_ERROR", error: e }))
    }
}

export const getClient = (id) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore()

        firestore.collection("clients").doc(id).get()
            .then((doc) => {
                dispatch({
                    type: "GET_CLIENT_SUCCESS",
                    payload: doc.data()
                })
            })
            .catch(e => dispatch({ type: "GET_CLIENT_ERROR", error: e }))
    }
}

export const addClientJob = (id, jobId, job) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore()

        firestore.collection("clients").doc(id).collection("jobs").doc(jobId).set(job)
            .then(() => dispatch({
                type: "JOB_ADD_SUCCESS",
            }))
            .catch(e => dispatch({
                type: "JOB_ADD_ERROR",
                error: e
            }))
    }
}
