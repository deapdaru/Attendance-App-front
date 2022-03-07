import React, {useState, useEffect} from "react";
import Ttab from "./Components/Ttab";
import PersistentDrawerLeft from "./Components/PersistentDrawerLeft";
import Grid from "@material-ui/core/Grid";
import {useHttp} from "./hooks/http";
import LinearProgress from "@material-ui/core/LinearProgress";
const Teachermain = props => {
  useEffect(() => {
    console.log("teacher main use effect");
  });
  let selectedData = null;
  const [fetchedData] = useHttp(
    `http://unicodeattendance.pythonanywhere.com/Attendance/dashboard-teacher/${props.location.state}`,
    []
  );
  if (fetchedData) {
    selectedData = {
      class_subjects: fetchedData.class_subjects,
      taught_subjects: fetchedData.taught_subjects,
      division_they_are_class_teacher_of:
        fetchedData.division_they_are_class_teacher_of,
    };
    console.log(selectedData);
  }
  if (fetchedData) {
    return (
      <div>
        <PersistentDrawerLeft />
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Ttab data={selectedData} />
          </Grid>
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

export default Teachermain;
