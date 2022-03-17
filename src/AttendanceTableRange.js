import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "./Components/Datepicker";
import PersistentDrawerLeft from "./Components/PersistentDrawerLeft";
import CustomizedTable from "./Components/CustomizedTable";
import Grid from "@material-ui/core/Grid";
import {useHttp} from "./hooks/http";
const styles = theme => ({
  spacing: {
    padding: "25px 50px",
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      margin: "auto",
    },
  },
  smallSpacing: {
    padding: "25px",
    [theme.breakpoints.down("sm")]: {
      padding: 10,
      margin: "auto",
    },
  },
});

const AttendanceTableRange = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formattedDateStart, setFormattedStartDate] = useState("");
  const [formattedDateEnd, setFormattedDateEnd] = useState("");

  useEffect(() => {
    console.log("use effect is running");
    var startcompleteDate = startDate;
    var startdate = startcompleteDate.getDate();
    var startmonth = startcompleteDate.getMonth() + 1;
    var startyear = startcompleteDate.getFullYear();
    var endcompleteDate = endDate;
    var enddate = endcompleteDate.getDate();
    var endmonth = endcompleteDate.getMonth() + 1;
    var endyear = endcompleteDate.getFullYear();
    const formatdDatestart = startdate + "-" + startmonth + "-" + startyear;
    const formatdDateend = enddate + "-" + endmonth + "-" + endyear;
    setFormattedStartDate(formatdDatestart);
    setFormattedDateEnd(formatdDateend);
  });

  const [fetchedData] = useHttp(
    `https://unicodeattendance.pythonanywhere.com/Attendance/get-attendance-of-range/${
      props.location.state.name
    }/${props.location.state.div}/${formattedDateStart}/${formattedDateEnd}`,
    [formattedDateStart, formattedDateEnd]
  );
  const fetchedAttenndance = fetchedData ? fetchedData.attendance : [];

  const handleChange = date => {
    setStartDate(date);
  };
  const handleChangeEnd = date => {
    setEndDate(date);
  };

  const updateChange = async event => {
    event.preventDefault();
    var startcompleteDate = startDate;
    var startdate = startcompleteDate.getDate();
    var startmonth = startcompleteDate.getMonth() + 1;
    var startyear = startcompleteDate.getFullYear();
    var endcompleteDate = endDate;
    var enddate = endcompleteDate.getDate();
    var endmonth = endcompleteDate.getMonth() + 1;
    var endyear = endcompleteDate.getFullYear();
    const formatdDatestart = startdate + "-" + startmonth + "-" + startyear;
    const formatdDateend = enddate + "-" + endmonth + "-" + endyear;
    setFormattedStartDate(formatdDatestart);
    setFormattedDateEnd(formatdDateend);
  };
  const {classes} = props;
  return (
    <div>
      <PersistentDrawerLeft />
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={8} className={classes.spacing}>
          <CustomizedTable
            attendance={fetchedAttenndance}
            subject={props.location.state.name}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2} className={classes.spacing}>
          <Datepicker
            startDate={startDate}
            handleChange={handleChange}
            updateChange={updateChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2} className={classes.spacing}>
          <Datepicker
            startDate={endDate}
            handleChange={handleChangeEnd}
            updateChange={updateChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

AttendanceTableRange.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttendanceTableRange);
