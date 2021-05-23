// import { NotificationManager } from "react-notifications"

const initState = [{}]

const PaymentReducer = (state = initState, action) => {
    switch (action.type) {

        case "PAYMENT_BUILD_SUCCESS":

            console.log("Payment Build Success!")

            return state;

        case "PAYMENT_BUILD_ERROR":

            console.error("Payment Build error!", action.error)
            return state;

        default:
            return state;
    }
}

export default PaymentReducer;