import React, {useState} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import {Grid, Button, CardContent} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CreateIcon from "@material-ui/icons/Create";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import DescriptionIcon from "@material-ui/icons/Description";
import {Link, Redirect} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Datepicker from "./Datepicker";
import {useDownloadHttp} from "../hooks/downloadHttp";
var Save_as = require("file-saver");

//import './style.css'

const styles = theme => ({
  card: {
    height: 225,
  },
  content: {
    padding: 2,
  },
  button: {
    margin: theme.spacing.unit * 0.8,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  rightIcon: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
});

const Mysubjectcard = props => {
  console.log(props);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formattedDateStart, setFormattedStartDate] = useState("");
  const [formattedDateEnd, setFormattedDateEnd] = useState("");
  const [open, setOpen] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [subject, setSubject] = useState({name: "", div: ""});
  const [sapSheetOpen, setSapSheetOpen] = useState(false);

  const [downloadCall] = useDownloadHttp();

  const handleChange = date => {
    setStartDate(date);
  };
  const handleChangeEnd = date => {
    setEndDate(date);
  };

  const downloadHandler = () => {
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
    downloadCall(
      `https://unicodeattendance.pythonanywhere.com/Attendance/get_csv/${
        subject.name
      }/${subject.div}/${formatdDatestart}/${formatdDateend}`
    );
  };

  const downloadSapSheetHandler = () => {
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
    downloadCall(
      `https://unicodeattendance.pythonanywhere.com/Attendance/download-sap-sheet/${
        subject.name
      }/${subject.div}/${formatdDatestart}/${formatdDateend}`,
      ".docx"
    );
  };

  const handleOpen = (name, div) => {
    setSubject({name, div});
    setOpen(true);
  };

  const handleSapSheetOpen = (name, div) => {
    console.log(name, div);
    setSubject({name, div});
    setSapSheetOpen(true);
  };

  const handleClickDownload = (name, div) => {
    setSubject({name, div});
    setOpenDownload(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSapSheetClose = () => {
    setSapSheetOpen(false);
  };

  const handleCloseDownload = () => {
    setOpenDownload(false);
  };

  const {classes} = props;
  return (
    <div>
      <Grid container spacing={16}>
        {props.taught_subjects.map((subject, index) => {
          return (
            <Grid key={index} item xs={12} sm={12} md={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.content}
                  >
                    <b>{subject.name}</b>
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.content}
                      >
                        Year: {subject.div.split("_")[0]}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.content}
                      >
                        Semester: {subject.semester}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.content}
                      >
                        Division: {subject.div.split("_")[1]}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions disableActionSpacing>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      handleClickDownload(subject.name, subject.div)
                    }
                  >
                    Download
                    <CloudDownloadIcon className={classes.rightIcon} />
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleOpen(subject.name, subject.div)}
                  >
                    View
                    <RemoveRedEyeIcon className={classes.rightIcon} />
                  </Button>
                  <Link
                    to={{pathname: `/editTable/${subject.div}`, state: subject}}
                    style={{textDecoration: "none"}}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Edit
                      <CreateIcon className={classes.rightIcon} />
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() =>
                      handleSapSheetOpen(subject.name, subject.div)
                    }
                  >
                    Sheet
                    <DescriptionIcon className={classes.rightIcon} />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog
        open={openDownload}
        onClose={handleCloseDownload}
        aria-labelledby="form-dialog-title"
        variant="outlined"
        style={{padding: 20}}
      >
        <div style={{display: "flex"}}>
          <DialogTitle id="form-dialog-title" style={{flexGrow: 1}}>
            SELECT Dates
          </DialogTitle>
          <Button
            onClick={handleCloseDownload}
            color="primary"
            style={{padding: "10px"}}
          >
            close
          </Button>
        </div>
        <DialogActions>
          <Grid container spacing={24} style={{padding: 10}}>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker startDate={startDate} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker startDate={endDate} handleChange={handleChangeEnd} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Button
                onClick={downloadHandler}
                color="primary"
                variant="contained"
                style={{padding: "10px"}}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div style={{display: "flex"}}>
          <DialogTitle id="form-dialog-title" style={{flexGrow: 1}}>
            SELECT VIEWS
          </DialogTitle>
          <Button
            onClick={handleClose}
            color="primary"
            style={{padding: "10px"}}
          >
            close
          </Button>
        </div>
        <DialogActions>
          <Link
            to={{
              pathname: `/attendanceTable/${subject.div}`,
              state: subject,
            }}
            style={{textDecoration: "none"}}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              View single date
              {/* <RemoveRedEyeIcon className={classes.rightIcon} /> */}
            </Button>
          </Link>
          <Link
            to={{
              pathname: `/attendanceTable/range/${subject.div}`,
              state: subject,
            }}
            style={{textDecoration: "none"}}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              View range date
              {/* <RemoveRedEyeIcon className={classes.rightIcon} /> */}
            </Button>
          </Link>
        </DialogActions>
      </Dialog>

      <Dialog
        open={sapSheetOpen}
        onClose={handleSapSheetClose}
        aria-labelledby="form-dialog-title"
        variant="outlined"
        style={{padding: 20}}
      >
        <div style={{display: "flex"}}>
          <DialogTitle id="form-dialog-title" style={{flexGrow: 1}}>
            SELECT Dates
          </DialogTitle>
          <Button
            onClick={handleSapSheetClose}
            color="primary"
            style={{padding: "10px"}}
          >
            close
          </Button>
        </div>
        <DialogActions>
          <Grid container spacing={24} style={{padding: 10}}>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker startDate={startDate} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker startDate={endDate} handleChange={handleChangeEnd} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Button
                onClick={downloadSapSheetHandler}
                color="primary"
                variant="contained"
                style={{padding: "10px"}}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Mysubjectcard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mysubjectcard);
