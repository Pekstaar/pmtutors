import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { GoVerified } from "react-icons/go";
import PageHeader from "./PageHeader";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Delete, Edit } from "@material-ui/icons";
import useStyles from "../css/vet.min.js"
import { connect } from "react-redux";
import { createVet, removeVet, updateVet } from "../../store/actions/vetAction"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const Vet = (props) => {
  const classes = useStyles();
  // states

  const [quizValue, setQuizValue] = useState([]);
  const [btn, setBtn] = useState("Add");
  const [newMode, setNewMode] = useState(true);
  const [qId, setQId] = useState("");


  const override = `
      display:flex;
      align-items:center;
      justify-content: center;
      border-color:red;
      `;


  // Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMode) {

      props.createVet(quizValue);


      setQuizValue("");


    } else {

      setNewMode(true)
      props.updateVet(qId, quizValue);
      setQuizValue("");


    }
    setBtn("Add")
  };
  // get Single quiz
  const editQuiz = async (id) => {
    setNewMode(false);
    setQId(id);

    const quiz = props.vet.find(e => e.id === id)
    //   console.log(quiz)
    setQuizValue(quiz.question)

  };

  return (
    <div>
      <PageHeader
        title="Client Vetting"
        subtitle="Manage quizes to test new Clients."
        icon={<GoVerified style={{ fontSize: "22px" }} />}
        displayVetButtons={true}
      />

      <div className={classes.root}>
        <Grid container style={{ display: "flex" }} spacing={3}>
          <form style={{ width: "100%" }} onSubmit={() => handleSubmit()}>
            <TextField
              id="outlined-full-width"
              placeholder={"Input Single Question"}
              fullWidth
              label="Job Requirements"
              value={quizValue}
              onChange={(e) => setQuizValue(e.target.value)}
              style={{ margin: 8, maxWidth: "1265px" }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
              variant="outlined"
            />
            <Button
              style={{ padding: ".8em 2em", margin: "0 10px" }}
              type="submit"
              color="primary"
              variant="contained"
            >
              {btn} Question
              </Button>
            <Button
              style={{ padding: ".8em 2em", margin: "0 10px" }}
              //   type="submit"
              color="secondary"
              variant="contained"
              onClick={() => setQuizValue("")}
            >
              Clear
              </Button>
          </form>
          <TableContainer style={{ maxWidth: "1265px" }} component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head}>Question</TableCell>
                  <TableCell className={classes.head}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!props.vet ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <ScaleLoader
                        css={override}
                        size={150}
                        color={"royalblue"}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  <div>
                    {/* {setLoading(false)} */}
                    {props.vet &&
                      props.vet.map((q) => (
                        <TableRow key={q.id}>
                          <TableCell>{q.question} </TableCell>

                          <TableCell>
                            <IconButton
                              onClick={() => {
                                editQuiz(q.id);
                                setBtn("update");
                              }}
                              color="primary"
                              aria-label="Update Customer"
                            >
                              <Edit />
                            </IconButton>

                            <IconButton
                              onClick={() => props.removeVet(q.id)}
                              color="secondary"
                              aria-label="Update Customer"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createVet: (vet) => dispatch(createVet(vet)),
    updateVet: (id, vet) => dispatch(updateVet(id, vet)),
    removeVet: (id) => dispatch(removeVet(id))
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    vet: state.firestore.ordered.vets
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: "vets",
      orderBy: ["createdat", "desc"],
    }
  ])
)(Vet);