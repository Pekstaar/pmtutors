import { NotificationManager } from "react-notifications"

const initState = {}

 const vetReducer = (state=initState, action) =>{
    
    switch(action.type){

        case "CREATE_VET":
            NotificationManager.success("Vet Created Successfully!", "Success")

            return state;

        case "CREATE_VET_ERROR":

            NotificationManager.error(action.error.message, "New Vet Error")

            return state;

        case "DELETE_VET":

            NotificationManager.success("Vet Deleted Successfully!", "Success")

            return state;

        case "DELETE_VET_ERROR":

            NotificationManager.error(action.error.message, "Vet Withdrawal error!")

            return state;

        case "UPDATE_VET":

            NotificationManager.success("Vet Updated Successfully")

            return state;
        
        case "UPDATE_VET_ERROR":

            NotificationManager.error(action.error.message,"Update Error!")

            return state;

        default:

            return state;

    }

}

export default vetReducer