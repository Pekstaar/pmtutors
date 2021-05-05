
export const createJob = (job) =>{

    return (dispatch, getState,{getFirebase}) => {
        // async firebase code comes here 
        const firestore = getFirebase().firestore();

        firestore.collection('jobs').add({
            ...job,
            createdat: new Date()
        }).then(() =>{
            dispatch({ type:"CREATE_JOB" })
        }).catch(e => {
            dispatch({type:"CREATE_JOB_ERROR",error:e})
        }) 


    }

}

export const removeJob = (id) =>{

    return (dispatch, getState,{getFirebase}) => {
        // async firebase code comes here 
        const firestore = getFirebase().firestore();

        firestore.collection('jobs').doc(id).delete()
        .then(() =>{
            dispatch({ type:"DELETE_JOB" })
        }).catch(e => {
            dispatch({type:"DELETE_JOB_ERROR",error:e})
        }) 


    }

}

export const updateJob = (id,data) =>{

    return (dispatch, getState,{getFirebase}) => {
        // async firebase code comes here 
        const firestore = getFirebase().firestore();

        firestore.collection('jobs').doc(id).update(data)
        .then(() =>{
            dispatch({ type:"UPDATE_JOB" })
        }).catch(e => {
            console.error(e)
            dispatch({type:"UPDATE_JOB_ERROR",error:e})
        }) 


    }

}