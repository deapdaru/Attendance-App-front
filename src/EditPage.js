import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Paper, Grid, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./Components/PersistentDrawerLeft";
import Checkbox from "@material-ui/core/Checkbox";
import Datepicker from "./Components/Datepicker";
import Button from "@material-ui/core/Button";
import {useHttp} from "./hooks/http";
import {useEditHttp} from "./hooks/editHttp";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 300,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
});

const EditPage = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [attendance_list, setAttendance_list] = useState([]);

  useEffect(() => {
    console.log("use effect is running");
    var completeDate = startDate;
    console.log(completeDate);
    var newdate = completeDate.getDate();
    var month = completeDate.getMonth() + 1;
    var year = completeDate.getFullYear();
    const formatdDate = newdate + "-" + month + "-" + year;
    setFormattedDate(formatdDate);
  });

  const [fetchedData] = useHttp(
    `http://unicodeattendance.pythonanywhere.com/Attendance/get-attendance-of-day/${props.location.state.name}/${props.location.state.div}/${formattedDate}`,
    [formattedDate]
  );
  const fetchedAttenndance = fetchedData ? fetchedData.attendance : [];
  console.log(fetchedAttenndance);

  const [message, fetchCall] = useEditHttp();

  const handleSubmit = async event => {
    event.preventDefault();
    var completeDate = startDate;
    var date = completeDate.getDate();
    var month = completeDate.getMonth() + 1;
    var year = completeDate.getFullYear();
    const formatdDate = date + "-" + month + "-" + year;
    setFormattedDate(formatdDate);
    let postData = {
      attendance_list: [
        {time: fetchedAttenndance[0].time, attendance_list: attendance_list},
      ],
    };
    fetchCall(
      `http://unicodeattendance.pythonanywhere.com/Attendance/edit-attendance-of-day/${props.location.state.name}/${props.location.state.div}/${formattedDate}`,
      JSON.stringify(postData)
    );
  };

  const handleChangeCheck = id => {
    console.log(id.id);
    let studentsCopy = fetchedAttenndance[0].attendance_list;
    if (studentsCopy[id.id].attendance == 1) {
      studentsCopy[id.id] = {...studentsCopy[id.id], attendance: 0};
      setAttendance_list(studentsCopy);
    } else {
      studentsCopy[id.id] = {...studentsCopy[id.id], attendance: 1};
      setAttendance_list(studentsCopy);
    }
  };

  const handleChange = date => {
    setStartDate(date);
    console.log(startDate);
  };

  const updateChange = () => {
    console.log(startDate);
    var completeDate = startDate;
    console.log(completeDate);
    var newdate = completeDate.getDate();
    var month = completeDate.getMonth() + 1;
    var year = completeDate.getFullYear();
    const formatdDate = newdate + "-" + month + "-" + year;
    setFormattedDate(formatdDate);
    console.log(formatdDate);
    console.log(formattedDate);
  };
  const {classes} = props;
  return (
    <div>
      <PersistentDrawerLeft />
      <Grid container className={classes.table}>
        <Grid item xs={12}>
          {fetchedAttenndance.length == 0 && (
            <Typography variant="h6" style={{margin: 10}}>
              No lecture today
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={24} style={{padding: 12}}>
        <Grid item xs={12} sm={12} md={8} className={classes.attendTable}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>SAP ID</CustomTableCell>
                  <CustomTableCell>Name</CustomTableCell>
                  <CustomTableCell>Edit</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchedAttenndance.length > 0 &&
                  fetchedAttenndance[0].attendance_list.map((row, id) => (
                    <TableRow className={classes.row} key={row.id}>
                      <CustomTableCell component="th" scope="row">
                        {row.sapID}
                      </CustomTableCell>
                      <CustomTableCell>{row.name}</CustomTableCell>
                      <CustomTableCell component="th" scope="row">
                        <Checkbox
                          checked={row.attendance == "1" ? true : false}
                          onChange={handleChangeCheck.bind(this, {id})}
                          value={row.Sap_id}
                        />
                      </CustomTableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Datepicker
            startDate={startDate}
            handleChange={handleChange}
            updateChange={updateChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            Post Change
          </Button>
        </Grid>
      </Grid>
      {message.length > 0 && (
        <Typography variant="h6" style={{margin: 20}}>
          {message}
        </Typography>
      )}
    </div>
  );
};

EditPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPage);
