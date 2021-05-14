import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
    Container,
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
} from "@material-ui/core";
import fb from "../config/fbConfig"
import img from "../images/img_3.jpg";
import FileUploader from "react-firebase-file-uploader";
import firebase from "../config/fbConfig"



// import { useAuth } from "../context/auth_context";
import useStyles from "../styling/vetting.min.js"
import { connect } from "react-redux";
import LinearProgressWithLabel from "../components/progress";
import { NotificationManager } from "react-notifications";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { CloudUpload } from "@material-ui/icons";
import { Redirect } from "react-router";
// import { NotificationManager } from "react-notifications";


const Vetting = (props) => {
    const classes = useStyles();

    const { auth } = props;

    const [task, setTask] = useState("_");
    const [selectState] = useState();
    // const [buttonName] = useState("Upload");
    const [taskList, setTaskList] = useState([]);
    const [attachments, setAttachments] = useState("");
    const [progress, setProgress] = useState(0);
    const [displayProgress, setDisplayProgress] = useState();

    const client = props.clients && props.clients.find(e => e.id === auth.uid)

    const handleChange = (e) => {
        e.preventDefault();
        setTask(e.target.value);
        window.localStorage.setItem("question", e.target.value)
    };

    const submitUpload = (url) => {
        if (task === "_") {
            window.alert("You have to pick a question")
            return
        }
        fb.firestore().collection("submitted_vets").doc(auth.uid)
            .set({
                title: task,
                url: url,
                uploadedby: client.username,
                uploadedat: new Date()
            })
            .then(() => {
                NotificationManager.success("Document Successfully uploaded")
                window.localStorage.removeItem("question")
            })
            .catch(e => NotificationManager.error(e.message, "Submit Error"))
    }

    useEffect(() => {
        let list = []
        const getTasks = () => {
            fb.firestore().collection("vets").get()
                .then(docs => docs.forEach(doc => list.push(doc.data())))
                .then(() => setTaskList([...list]))

            const myvet = fb.firestore().collection("submitted_vets").doc(auth.uid)
            // if (myvet.data().attachments !== undefined) {
            if (window.localStorage.getItem("question")) {
                setTask(window.localStorage.getItem("question"))
                // return
            }
            myvet.get()
                .then(r => {
                    // console.log(r.data())
                    if (r.data() !== undefined) {
                        setAttachments(r.data().url);
                        setTask(r.data().title)
                    }
                })
            // }
        }
        getTasks();
    }, []);

    return (
        auth && !auth.uid ? <Redirect to="/login" /> : <>
            {
                client && client.level && client.level === "beginner" ?
                    <>
                        {NotificationManager.success("You were approved!")}
                        {window.localStorage.removeItem("question")}
                        < Redirect to="/profile" />
                    </>
                    :
                    < div style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(190, 20, 93, 0.63)), url(${img})`, backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }
                    }>
                        <Container className={classes.root} maxWidth="md" spacing={3}>
                            <Grid item md={8} sm={9} xs={12}>
                                <Paper className={classes.paper}>
                                    <h3 className={classes.head}>VETTING</h3>
                                    {/* login with google button */}
                                    <div>
                                        <h5>Task requirements:</h5>
                                        <li>350-500 words (not more than 500)</li>

                                        <li>0% plagiarism</li>

                                        <li>Proper grammar and no spelling mistakes.</li>

                                        <li>
                                            Atleast one occurrence of the following punctuation marks.
                             </li>
                                        <div className={classes.list_container}>
                                            <ul className={classes.list}>
                                                <li>Commas</li>
                                                <li>Colons</li>
                                                <li>SemiColons</li>
                                                <li>Exclamation marks</li>
                                                <li>Quotation marks</li>
                                            </ul>
                                            <ul className={classes.list}>
                                                <li>Apostrophe</li>
                                                <li>Parentheses</li>
                                                <li>Dashes</li>
                                                <li>Hyphens </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <span>
                                        <strong>FORMAT:</strong> APA DOCUMENTATION
                        </span>
                                    <br />

                                    {/* tasks dropdown */}
                                    {/* {initialClientTasks.map((t) => console.log(t.index, t.value))} */}
                                    {
                                        attachments ?
                                            client && client.level === "to_vet" ?
                                                <>
                                                    <br />
                                                    <div style={{ textAlign: "center", padding: ".5em", backgroundColor: 'rgba(0,0,0,0.2)', fontWeight: "lighter", fontStyle: "italic", fontFamily: "Roboto" }}>
                                                        <p> Await approval of your uploaded test by pmtutors admin <br /> approval may take 12-24 hours <br /> <strong>Thankyou!</strong></p>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <br />
                                                    <div style={{ textAlign: "center", padding: ".5em", backgroundColor: 'rgba(0,0,0,0.2)', fontWeight: "lighter", fontStyle: "italic", fontFamily: "Roboto" }}>
                                                        <p> Please Check your email for more information about your task
                                            <br />
                                            for more information
                                            <br />
                                                            <strong>Contact us: pmtutors@gmail.com</strong></p>
                                                    </div>
                                                </>
                                            :
                                            <>
                                                <span style={{ backgroundColor: "rgba(0,0,0,0.2)", fontWeight: "bold", margin: "0 2em" }}>
                                                    <strong>YOUR TASK:</strong> <u>{task}</u>
                                                </span>
                                                <br />
                                                <FormControl
                                                    style={{ width: "80%" }}
                                                    className={classes.formControl}
                                                    disabled={selectState}
                                                >
                                                    <Select
                                                        value={task}
                                                        onChange={handleChange}
                                                        autoWidth
                                                        displayEmpty
                                                        className={classes.selectEmpty}
                                                        inputProps={{ "aria-label": "Without label" }}
                                                        fullWidth
                                                        style={{ width: "100%" }}
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Choose a task from the list below:
                                         </MenuItem>
                                                        {taskList &&
                                                            taskList.map((task, k) => (
                                                                <MenuItem key={k} value={task.question}>
                                                                    {task.question}
                                                                </MenuItem>
                                                            ))}
                                                        <MenuItem value="_" disabled></MenuItem>
                                                    </Select>
                                                    <FormHelperText>Tasks</FormHelperText>
                                                </FormControl>

                                                <div className={classes.upload}>
                                                    {attachments ?
                                                        <Paper style={{ width: "160px", height: "120px", background: "#fff", display: "flex" }}>
                                                            <CloudUpload style={{ fontSize: "60px", margin: "auto   " }} />
                                                        </Paper>
                                                        :

                                                        "upload item here!"
                                                    }
                                                </div>
                                                <br />
                                                <Upload task={task} submit={submitUpload} setProgress={setProgress} id={auth.uid} setAttachments={setAttachments} setDisplayProgress={setDisplayProgress} />

                                                {displayProgress ?
                                                    <div className={classes.progress}>
                                                        <LinearProgressWithLabel value={progress && progress} />
                                                    </div>
                                                    :
                                                    ""
                                                }
                                            </>
                                    }
                                </Paper>
                            </Grid>
                        </Container>
                    </ div>
            }
        </>
    );
};
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        // jobs: state.firestore.ordered.jobs,
        clients: state.firestore.ordered.clients
    };
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        {
            collection: "clients",
        }
    ])
)(Vetting);

// export default ;

// import firebase from "firebase";

export class Upload extends React.Component {
    state = {
        downloadURLs: "",
        isUploading: false,
        uploadProgress: 0
    };

    handleUploadStart = () => {

        this.props.setDisplayProgress(true);

        this.setState({
            isUploading: true,
            uploadProgress: 0
        });
    }

    handleProgress = progress => {
        this.setState({
            uploadProgress: progress
        });
        this.props.setProgress(
            progress
        )

    }

    handleUploadError = error => {
        this.setState({
            isUploading: false
            // Todo: handle error
        });
        console.error(error);
    };

    handleUploadSuccess = async filename => {
        const downloadURL = await firebase
            .storage()
            .ref(`vets/${this.props.id}`)
            .child(filename)
            .getDownloadURL();

        this.props.setAttachments(downloadURL)

        this.setState(() => ({
            // filenames: [...oldState.filenames, filename],
            uploadProgress: 100,
            isUploading: false
        }));

        console.log(downloadURL)
        this.props.submit(downloadURL)
        setTimeout(() => this.props.setDisplayProgress(false), 3000);

    };

    render() {
        return (
            <div>
                <label style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer', width: "200%", textAlign: "center" }}>
                    Upload File
                    <FileUploader
                        accept="image/*,.xml,.txt,.rtf,.pdf,.docx,.doc,"
                        hidden
                        randomizeFilename
                        storageRef={firebase.storage().ref(`vets/${this.props.id}`)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        multiple
                    />
                </label>
                {/* <p>Progress: {this.state.uploadProgress}</p>

                <p>Filenames: {this.state.filenames.join(", ")}</p>

                 */}
            </div>
            // </div >
        );
    }
}