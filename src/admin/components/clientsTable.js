import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { PersonAddDisabled } from "@material-ui/icons";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import useStyles from "../css/job.min.js"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";
import fb from "../../config/fbConfig"
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";// file styling

const ClientsTable = (props) => {
    const classes = useStyles();

    //   disable account funcition
    const disableAccount = (id) => {
        fb.firestore().collection("clients").doc(id).update({ status: "disabled" })
            .then(() => NotificationManager.success("Account Disabled!"))
            .catch(e => NotificationManager.error(e.message, "Account Disable Error!"))
    }

    const override = `
    display:flex;
    align-items:center;
    justify-content: center;
    border-color:red;
    `;

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.head}>Name</TableCell>
                    <TableCell className={classes.head}>Email</TableCell>
                    <TableCell className={classes.head}>Contact</TableCell>
                    <TableCell className={classes.head}>Username</TableCell>
                    <TableCell className={classes.head}>Institute</TableCell>
                    <TableCell className={classes.head}>Date Joined</TableCell>
                    <TableCell className={classes.head}>Disable</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!props.clients ? (
                    <TableRow>
                        <TableCell colSpan={7}>
                            <ScaleLoader
                                css={override}
                                size={150}
                                color={"royalblue"}
                            // loading={loading}
                            />
                        </TableCell>
                    </TableRow>
                ) : (
                    <>
                        {props.clients &&
                            props.clients.map((j, key) => (
                                <TableRow key={key}>
                                    <TableCell>{j.name} </TableCell>
                                    <TableCell>{j.email}</TableCell>
                                    <TableCell>{j.phonenumber}</TableCell>
                                    <TableCell>{j.username}</TableCell>
                                    <TableCell>{j.study}</TableCell>
                                    <TableCell>{moment(j.createdat.toDate()).calendar()}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => disableAccount(j.id)}
                                            color="primary"
                                            aria-label="Disable Account"
                                            variable="outlined"
                                        >
                                            <PersonAddDisabled />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))}
                    </>
                )}
            </TableBody>
        </Table>
    )
}

const mapStateToProps = (state) => {

    return {
        clients: state.firestore.ordered.clients
    }
}



export default compose(
    connect(mapStateToProps, null),
    firestoreConnect(() => [
        {
            collection: "clients",
            orderBy: ["createdat", "desc"],
        }
    ])
)(ClientsTable);
