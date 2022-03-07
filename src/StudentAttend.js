import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Paper, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./Components/PersistentDrawerLeft";
import {useHttp} from "./hooks/http";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "100%!important",
    },
  },
  table: {
    minWidth: 400,
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

const StudentAttend = props => {
  let selectedData = null;

  const [fetchedData] = useHttp(
    `http://unicodeattendance.pythonanywhere.com/Attendance/get-attendance-of-student/${props.location.subject}/${props.location.sapID}`,
    []
  );
  if (fetchedData) {
    selectedData = {
      attendance: fetchedData.attendance,
      attendance_count: fetchedData.attendance_count,
      attendance_total: fetchedData.attendance_total,
      attendance_percentage: fetchedData.attendance_percentage,
    };
  }

  const {classes} = props;
  if (selectedData) {
    return (
      <div>
        <PersistentDrawerLeft />
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Paper style={{padding: 20}}>
              <Grid container className={classes.table}>
                <Grid item xs={6}>
                  <Typography align="center" variant="h5">
                    Sap ID: {props.location.sapID}
                  </Typography>
                </Grid>
                <Grid item xs={6} align="center" style={{textAlign: "justify"}}>
                  <Typography variant="h6">
                    Attendance count : {selectedData.attendance_count}
                  </Typography>
                  <Typography variant="h6">
                    Attendance percentage : {selectedData.attendance_percentage}
                  </Typography>
                  <Typography variant="h6">
                    Attendance total : {selectedData.attendance_total}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Grid item xs={12} sm={12}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <CustomTableCell style={{fontSize: "1rem"}}>
                        Date
                      </CustomTableCell>
                      <CustomTableCell style={{fontSize: "1rem"}}>
                        Time
                      </CustomTableCell>

                      <CustomTableCell style={{fontSize: "1rem"}}>
                        Present/Absent
                      </CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedData.attendance.map(row => (
                      <TableRow className={classes.row} key={row.id}>
                        <CustomTableCell component="th" scope="row">
                          {row.date}
                        </CustomTableCell>
                        <CustomTableCell component="th" scope="row">
                          {row.timing}
                        </CustomTableCell>
                        {row.attendance === "1" ? (
                          <CustomTableCell className={classes.green}>
                            {row.attendance}
                          </CustomTableCell>
                        ) : (
                          <CustomTableCell className={classes.red}>
                            {row.attendance}
                          </CustomTableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <PersistentDrawerLeft />
        <LinearProgress style={{marginTop: "-44px"}} color="secondary" />
      </div>
    );
  }
};

StudentAttend.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentAttend);
