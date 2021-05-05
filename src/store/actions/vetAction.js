export const createVet = (vet) =>{

    return (dispatch, getState,{getFirebase}) => {
        // async firebase code comes here 
        const firestore = getFirebase().firestore();

        firestore.collection('vets').add({
            question:vet,
            createdat: new Date()
        }).then(() =>{
            dispatch({ type:"CREATE_VET" })
        }).catch(e => {
            dispatch({type:"CREATE_VET_ERROR",error:e})
        }) 


    }

}

export const removeVet = (id) =>{

    return (dispatch, getState,{getFirebase}) => {
        // async firebase code comes here 
        const firestore = getFirebase().firestore();

        firestore.collection('vets').doc(id).delete()
        .then(() =>{
            dispatch({ type:"DELETE_VET" })
        }).catch(e => {
            dispatch({type:"DELETE_VET_ERROR",error:e})
        }) 


    }

}

export const updateVet = (id,data) =>{

    return (dispatch, getState,{getFirebase}) => {
        // async firebase code comes here 
        const firestore = getFirebase().firestore();

        firestore.collection('vets').doc(id).update({
            question:data
        })
        .then(() =>{
            dispatch({ type:"UPDATE_VET" })
        }).catch(e => {
            console.error(e)
            dispatch({type:"UPDATE_VET_ERROR",error:e})
        }) 


    }

}