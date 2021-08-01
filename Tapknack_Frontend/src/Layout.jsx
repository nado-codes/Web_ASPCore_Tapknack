import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import background from "./res/tpk_background.png";

const Layout = ({ children }) => {
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        width: "100%",
        bottom: 0,
        top: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
      }}
    >
      {children}
    </Grid>
  );
};

export default Layout;
