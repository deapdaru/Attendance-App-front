import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "./Components/Datepicker";
import PersistentDrawerLeft from "./Components/PersistentDrawerLeft";
import CustomizedTable from "./Components/CustomizedTable";
import {useHttp} from "./hooks/http";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  spacing: {
    padding: "25px 50px",
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      margin: "auto",
    },
  },
});

const AttendanceTable = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

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
    `https://unicodeattendance.pythonanywhere.com/Attendance/get-attendance-of-day/${
      props.location.state.name
    }/${props.location.state.div}/${formattedDate}`,
    [formattedDate]
  );
  const fetchedAttenndance = fetchedData ? fetchedData.attendance : [];
  console.log(fetchedAttenndance);

  const handleChange = date => {
    setStartDate(date);
    console.log(startDate);
  };

  const updateChange = async event => {
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
      <Grid container>
        <Grid item md={12} lg={9} className={classes.spacing}>
          <CustomizedTable
            attendance={fetchedAttenndance}
            subject={props.location.state.name}
          />
        </Grid>
        <Grid item md={12} lg={3} className={classes.spacing}>
          <Datepicker
            startDate={startDate}
            handleChange={handleChange}
            updateChange={updateChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

AttendanceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendanceTable);
