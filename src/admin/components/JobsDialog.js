
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AiOutlineFileWord } from "react-icons/ai";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import LinearProgressWithLabel from "../../components/progress";
// import LinearProgressWithLabel from "../../components/progress";
import Uploader from "./Uploader";

const JobsDialog = (props) => {
  // styling
  //   const classes = useStyles();
  //
  //
  const {
    title,
    description,
    requirements,
    createdby,
    status,
    takenby,
    deadline,
    pagecost,
    totalcost,
    category,
  } = props.jobDetails;

  const [progress, setProgress] = useState(0)
  const [displayProgress, setDisplayProgress] = useState(false)
  const [display, setDisplay] = useState("grid")

  useEffect(() => {
    const getAttachments = () => {
      if (props.state.attachments && props.state.attachments.downloadURL) {
        setDisplay("none")
      } else {
        setDisplay("grid")
      }
    }
    getAttachments()
  }, [])


  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={props.close}
      aria-labelledby={"max-width-dialog-title"}
    >
      <DialogTitle>{props.formmode ? "Add" : "Update"} Task</DialogTitle>
      <ValidatorForm onSubmit={(e) => props.addJob(e)}>
        <DialogContent>
          <Grid container spacing={3}>
            {/* title input */}
            <Grid item sm={10}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Job Title"
                onChange={props.handleChange}
                name="title"
                value={title}
                validators={["required"]}
                errorMessages={["Required Field!"]}
                autoComplete="off"
              />
            </Grid>

            {/* Description input */}
            <Grid item sm={10}>
              <textarea
                placeholder="required*   Description About Job . . . ."
                value={description}
                onChange={props.handleChange}
                name="description"
                required
                style={{
                  height: "200px",
                  width: "100%",
                  padding: ".5em 1em",
                  outline: "none",
                  border: "1px solid #21252942",
                  fontSize: "15px",
                }}
              />
            </Grid>

            {/*  job input */}
            <Grid item sm={10}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Job Requirements"
                onChange={props.handleChange}
                name="requirements"
                value={requirements}
                validators={["required"]}
                errorMessages={["Required Field!"]}
                autoComplete="off"
              />
            </Grid>
            {/*  deadline input */}
            <Grid item sm={4}>
              <TextValidator
                variant="outlined"
                margin="normal"
                placeholder="Deadline format: date/month/year(1921)"
                fullWidth
                label="Job Deadline"
                onChange={props.handleChange}
                name="deadline"
                value={deadline}
                validators={["required"]}
                errorMessages={["Required Field!"]}
                autoComplete="off"
              />
            </Grid>

            {/*  cost per page */}
            <Grid item sm={3}>
              <TextValidator
                variant="outlined"
                margin="normal"
                placeholder="Cost per Page(kshs)"
                fullWidth
                label="cost per page"
                onChange={props.handleChange}
                name="pagecost"
                value={pagecost}
                autoComplete="off"
              />
            </Grid>
            {/*  Total cost */}
            <Grid item sm={3}>
              <TextValidator
                variant="outlined"
                margin="normal"
                placeholder="Total Cost(kshs)"
                fullWidth
                label="Total Cost"
                onChange={props.handleChange}
                name="totalcost"
                value={totalcost}
                autoComplete="off"
              />
            </Grid>

            {/* select created by */}
            <Grid item sm={4}>
              <FormControl style={{ width: "80%" }} required>
                <InputLabel htmlFor="age-native-required">
                  CreatedBy:
                  </InputLabel>
                <Select
                  native
                  value={createdby}
                  onChange={props.handleChange}
                  name="createdby"
                  inputProps={{
                    id: "age-native-required",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"Admin"}>Admin</option>
                  <option value={"Student"}>Student</option>
                </Select>
                <FormHelperText>Job Created By:</FormHelperText>
              </FormControl>
            </Grid>

            {/* Select status */}
            <Grid item sm={3}>
              <FormControl style={{ width: "80%" }} required>
                <InputLabel htmlFor="status-native-required"></InputLabel>
                <Select
                  native
                  value={status}
                  onChange={props.handleChange}
                  name="status"
                  inputProps={{
                    id: "status-native-required",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"waiting"}>Waiting</option>
                  <option value={"taken"}>Taken</option>
                  <option value={"complete"}>Complete</option>
                  {/* <option value={"expired"}>Expired</option> */}
                </Select>
                <FormHelperText>Job Status:</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl style={{ width: "75%" }}>
                <InputLabel htmlFor="takenby-native-required">
                  {/* Taken By */}
                </InputLabel>
                <Select
                  native
                  variant="standard"
                  autoWidth
                  value={takenby}
                  onChange={props.handleChange}
                  name="takenby"
                  inputProps={{
                    id: "takenby-native-required2",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"none"}>Not Yet</option>
                  <option value={"custom"}>Custom Client</option>
                  <option value={"signed_in_client"}>signed in Client</option>
                </Select>
                <FormHelperText>Job taken by:</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <FormControl style={{ width: "75%" }}>
                <InputLabel htmlFor="category-native-required">
                  {/* Category */}
                </InputLabel>
                <Select
                  native
                  variant="standard"
                  autoWidth
                  value={category}
                  onChange={props.handleChange}
                  name="category"
                  inputProps={{
                    id: "category-native-required2",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"statistics"}>Statistics</option>
                  <option value={"research"}>Research Client</option>
                  <option value={"management"}>Management</option>
                  <option value={"coding"}>Coding</option>
                  <option value={"Finance"}>Finance</option>
                </Select>
                <FormHelperText>Job Category:</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "0 auto",
                }}
              >
                <h4 style={{ fontFamily: "Varela Round", fontWeight: "lighter", fontStyle: "italic" }}>Attachments:</h4>
                <div style={{ display: "flex", flexDirection: "column", minWidth: "400px" }}>
                  <div>
                    {
                      <div
                        style={{
                          display: "grid",
                          placeItems: "center",
                          marginBottom: "10px",

                        }}
                      >
                        <Uploader values={props.state} setUploadProgress={setProgress} displayProg={setDisplayProgress} setData={props.setAttachments}
                          id={props.id} />
                      </div>
                    }
                    {displayProgress ?
                      <div style={{
                        width: "50%",
                        margin: "0 auto",
                      }}>
                        <LinearProgressWithLabel value={progress} />
                      </div>
                      :
                      ""
                    }
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    {
                      props.atts && props.atts.map((doc, key) => {
                        console.log(doc)
                        if ((doc.downloadURL) && doc.tag.includes("image")) {
                          return (
                            <div style={{ display: "inline-block", padding: "0 1em" }} key={key} >
                              <Paper style={{ width: "160px", height: "120px", background: "#fff", display: "flex" }}>
                                {/* <span style={{ fontSize: "40px", fontWeight: "bold", margin: "auto   " }} >.docx</span> */}
                                <img src={`${doc.downloadURL}`} alt="uploaded doc" />
                              </Paper>
                              <span style={{ color: "blue", fontStyle: "italic" }}>{`${doc.downloadURL && doc.downloadURL.substring(16, 42)}. . .`}</span>
                            </div>
                          )
                        }
                        // doc.downloadURL &&
                        else if (doc.downloadURL && (doc.tag.includes("octet") || doc.tag.includes("word") || doc.tag.includes("pdf"))) {
                          return (
                            <div style={{ display: "inline-block", padding: "0 1em" }} key={key} >
                              < Paper style={{ width: "160px", height: "130px", background: "#fff", display: "flex" }}>
                                <AiOutlineFileWord style={{ margin: "auto", fontSize: "130px" }} />
                              </ Paper>
                              <span style={{ color: "blue", fontStyle: "italic" }}>{`${doc.downloadURL && doc.downloadURL.substring(16, 42)}. . .`}</span>
                            </div>
                          )
                        } return ("")

                      })
                    }
                  </div>
                </div>

              </div>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" type="submit" color="primary" >
            {props.formmode ? "Add" : "Update"}
          </Button>

          <Button variant="outlined" onClick={props.close} color="secondary">
            Close
            </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog >
  );
};

// const useStyles = makeStyles({});

export default JobsDialog;