import React, { useState } from 'react'
import "../styling/account.css"
import Navbar from '../components/navigation/Navbar'
import AccountListGroup from '../components/AccountListGroup'
import { Button, FilledInput, FormControl, InputAdornment, InputLabel, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { NotificationManager } from "react-notifications"
import PulseLoader from 'react-spinners/PuffLoader'
import fb from '../config/fbConfig'
import { ExitToApp } from '@material-ui/icons'

const Account = () => {
    const [open, setOpen] = React.useState("mpesa");
    const [number, setNumber] = React.useState("");
    const [enableInput, setReadOnly] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [transactions, setTransactions] = useState([])

    const { auth } = useSelector(state => state.firebase)
    const [user, setUser] = useState({ balance: 0 });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 
        if (enableInput === false) {
            try {
                fb.firestore().collection("clients").doc(auth.uid).update({
                    account: fb.firestore.FieldValue.arrayUnion({
                        type: open,
                        accNumber: number
                    })
                })

                NotificationManager.success("Account Setup successful!")
                getPaymentSetUp(open)
            } catch (e) {
                NotificationManager.error("Account Setup unsuccessful!")
                console.error(e)
            }
        } else {
            return ""
        }
    }

    const getPaymentSetUp = async (type) => {
        setLoading(true)
        const client = await fb.firestore().collection("clients").doc(auth.uid)

        try {
            client.onSnapshot((doc) => {
                if (doc.data().account) {
                    const data = doc.data().account.find(m => m.type === type)
                    console.log(data)
                    if (data && data.type && data.type === type) {
                        setNumber(data.accNumber)
                        setReadOnly(true)
                        setLoading(false)
                    } else {
                        setNumber("")
                        setReadOnly(false)
                        setLoading(false)
                    }
                } else {
                    setNumber("")
                    setReadOnly(false)
                    setLoading(false)
                }
            })
        } catch (e) {
            console.error(e)
        }
    }

    React.useEffect(() => {
        const getUser = async () => {
            const c = await fb.firestore().collection("clients").doc(auth.uid).get()
            setUser(c.data());
        }

        const getTransactions = async () => {
            let list = []
            const ts = await fb.firestore().collection("clients").doc(auth.uid).collection("mytransactions").limit(12).get()
            ts.forEach(doc => {
                list.push(doc.data())
            })
            setTransactions([...list])
            console.log(list)
        }

        getTransactions()
        getUser()
        getPaymentSetUp("mpesa")
    }, [auth.uid])

    return (
        <div className="account container p-2 bg-light">
            <Navbar />
            <div className="row py-4">
                <div className="col-md-11 p-2 m-auto border border-secondary">
                    {/* <div className="container-fluid"> */}
                    <div className="row">
                        <div className="col-3">
                            <AccountListGroup setOpen={setOpen} getPaymentSetUp={getPaymentSetUp} />
                        </div>
                        <div className="col-7 p-4" style={{ background: "white" }}>
                            {
                                open === "mpesa" ? (
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="row">
                                            {loading === true ?
                                                // <div className="w-75">
                                                <PulseLoader />
                                                // {/* </div> */}
                                                :
                                                <small className="alert alert-warning mx-2 w-75">!!!please ensure you enter correct credentials for later updates are not allowed</small>
                                            }
                                            <div className="col-10 d-flex flex-column">
                                                <span className="slab">{open} setup</span>
                                                <FormControl fullWidth variant="filled" className="mb-3">
                                                    <InputLabel htmlFor="filled-adornment-amount">Phone Number</InputLabel>
                                                    <FilledInput
                                                        id="filled-adornment-amount"
                                                        type="number"
                                                        value={number}
                                                        required
                                                        readOnly={enableInput}
                                                        onChange={(e) => setNumber(e.target.value)}
                                                        startAdornment={<InputAdornment position="start">+254</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Button type="submit" className=" py-2" style={{ width: "40% ", height: "3.4em", marginLeft: "" }} variant="contained" color="primary">
                                                    Submit
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                )
                                    : open === "paypal" ? (
                                        <form action="" onSubmit={handleSubmit}>
                                            <div className="row">
                                                {loading === true ?
                                                    // <div className="w-75">
                                                    <PulseLoader />
                                                    // {/* </div> */}
                                                    :
                                                    <small className="alert alert-warning mx-2 w-75">!!!please ensure you enter correct credentials for later updates are not allowed</small>
                                                }
                                                <div className="col-10 d-flex flex-column">
                                                    <span className="slab">{open} setup</span>
                                                    <FormControl fullWidth variant="filled" className="mb-3">
                                                        <InputLabel htmlFor="filled-adornment-amount">account-number</InputLabel>
                                                        <FilledInput
                                                            id="filled-adornment-amount"
                                                            type="number"
                                                            value={number}
                                                            placeholder="input your paypal account number"
                                                            required
                                                            readOnly={enableInput}
                                                            onChange={(e) => setNumber(e.target.value)}
                                                        // startAdornment={<InputAdornment position="start">+254</InputAdornment>}
                                                        />
                                                    </FormControl>
                                                    <Button type="submit" className=" py-2" style={{ width: "40% ", height: "3.4em" }} variant="contained" color="primary">
                                                        Submit
                                                </Button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : ""
                            }
                        </div>
                    </div>
                    {/* </div> */}
                    <div className="row py-4 d-flex">
                        <Paper className="col-3 d-flex bg-secondary text-white p-2 shadow slab" style={{ marginLeft: "29%" }}>
                            <h6 className="m-auto">YOUR BALANCE: {`$${user.balance && user.balance}`} </h6><Paper className="bg-secondary px-2 text-white" style={{ fontSize: "30px", boxShadow: "inherit" }}><ExitToApp /></Paper>
                        </Paper>
                    </div>

                </div>
                <div className="row">
                    <div className="col-10 m-auto py-3">
                        <div className="col-3 m-auto text-center">
                            <h4 className="slab text-primary" >Transactions History</h4><hr />
                        </div>

                        {transactions ? transactions.map((doc, key) => (
                            <div className="col-10 mx-auto slab alert bg-success text-white transactions" key={key}>
                                <span>{doc.title}</span>
                                <span>{doc.balance}</span>
                                <span>{doc.status ? doc.status : "settled"}</span>
                            </div>
                        ))
                            :
                            <div className="col-10 mx-auto slab alert bg-warning transactions" >
                                <span>No Transactions made yet pick a job to make one</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
