import {NotificationManager} from "react-notifications"

const clientReducer = (state={}, action) =>{
    switch(action.type){
        case "PROFILE_UPDATE_SUCCESS":

            NotificationManager.success("Profile update successful");
            
            return state;
        
        case "PROFILE_UPDATE_ERROR": 

            NotificationManager.error(action.error.message,"Profile Update error")

           return state;

        case "GET_CLIENT_SUCCESS":

            NotificationManager.success("Get client success!")

            return {
                ...state,
                user: action.payload
            }
        
        case "GET_CLIENT_ERROR":

            NotificationManager.error(action.error.message,"Client fetch error!")

            return state;

        case "JOB_ADD_SUCCESS":

            NotificationManager.success("added to My Jobs!")

            return state;

        case "JOB_ADD_ERROR":

            NotificationManager.error(action.error.message)

            return state;

        default:
            return state;
    }
}

export default clientReducer;