import NotificationManager from "react-notifications/lib/NotificationManager";

// const initState = {}

const authReducer = (state={}, action) =>{
    // switch user actions
    switch(action.type){
        case "LOGIN_SUCCESS":

            NotificationManager.success("You logged in successfuly")
            
            return { ...state,u: action.payload};
            

        case "LOGIN_ERROR":
              
            NotificationManager.error(action.error.message,"Login error!")
            
            return state;

        case "LOGOUT_SUCCESS":

            NotificationManager.success("SignOut Success!")

            return state;

        case "SIGNUP_SUCCESS":

            NotificationManager.success("Sign Up Success!")

            return state;
        
        case "SIGNUP_ERROR":

            NotificationManager.error(action.error.message, "Sign Up Error!")

            return state;

        default:

            return state;
    }
}

export default authReducer;