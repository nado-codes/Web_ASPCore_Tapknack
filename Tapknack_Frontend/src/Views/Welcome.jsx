import React from "react";
import { Grid } from "@material-ui/core";

import TPKIcon from "../res/iconTPK";

const Welcome = () => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Grid
        item
        style={{
          display: "flex",
          flex: 0.125,
          height: "10px",
          width: "75%",
          marginLeft: "auto",
          backgroundColor: "red",
          borderBottom: "2px solid rgba(40,172,217,.5)",
          alignItems: "center",
        }}
      >
        {/* Logo - TapKnack */}
        <Grid item style={{ flex: 0.5 }}>
          <TPKIcon size={75} />
        </Grid>
        <Grid item style={{ flex: 0.25 }}>
          HELLO
        </Grid>
      </Grid>
      <Grid
        item
        style={{
          flex: 1,
          height: "10px",
          backgroundColor: "green",
        }}
      ></Grid>
      <Grid
        item
        style={{
          flex: 0.125,
          height: "10px",
          backgroundColor: "blue",
        }}
      ></Grid>
    </Grid>
  );
};

export default Welcome;
