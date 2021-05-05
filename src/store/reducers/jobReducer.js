import { NotificationManager } from "react-notifications"

const initState = [{}]

 const jobReducer = (state=initState, action) =>{
    
    switch(action.type){

        case "CREATE_JOB":
            NotificationManager.success("Job Created Successfully!", "Success")

            return state;

        case "CREATE_JOB_ERROR":

            NotificationManager.error(action.error.message, "New Job Error")

            return state;

        case "DELETE_JOB":

            NotificationManager.success("Job Deleted Successfully!", "Success")

            return state;

        case "DELETE_JOB_ERROR":

            NotificationManager.error(action.error.message, "Job Withdrawal error!")

            return state;

        case "UPDATE_JOB":

            NotificationManager.success("Job Updated Successfully")

            return state;
        
        case "UPDATE_JOB_ERROR":

            NotificationManager.error(action.error.message,"Update Error!")

            return state;

        default:

            return state;

    }

}

export default jobReducer