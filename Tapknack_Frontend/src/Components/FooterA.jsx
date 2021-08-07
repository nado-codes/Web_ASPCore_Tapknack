import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import ndcIcon from "../res/nadocoLogo.png";
import { useGlobalStyles } from "../Styles/GlobalStyles";
import PropTypes from "prop-types";

/*
    The NadoCo Interactive logo. Returns an image

    Created by Nathan Linsley 08/08/2021
*/
const NDCIcon = () => {
  const globalClasses = useGlobalStyles();

  return (
    <img
      className={globalClasses.noSelect}
      src={ndcIcon}
      alt="NadoCo Interactive"
      style={{ width: "150px", height: "50px", objectFit: "contain" }}
    />
  );
};

/*
    A container which displays the NadoCo Interactive logo, preceded by an optional subtitle
    "Proudly owned by"

    Created by Nathan Linsley 08/08/2021
*/
const FooterA = ({ showSubtitle }) => {
  return (
    <Grid
      container
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 0.2,
        alignItems: "center",
      }}
    >
      {/* Preceding subtitle "Proudly Owned By" - optional /w prop "showSubtitle"*/}
      <Grid
        item
        style={{
          width: "25%",
          flex: 0.1,
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        {showSubtitle && (
          <Typography style={{ color: "#29E4FF", fontFamily: "Ubuntu" }}>
            Brought to you by
          </Typography>
        )}
      </Grid>

      {/* NadoCo Interactive Logo */}
      <Grid
        item
        style={{
          width: "25%",
          flex: 0.9,
          paddingTop: "-20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Button
          startIcon={<NDCIcon />}
          style={{
            borderRadius: "10px",
            userSelect: "none",
          }}
        />
      </Grid>
    </Grid>
  );
};

FooterA.propTypes = {
  showSubtitle: PropTypes.bool,
};

FooterA.defaultProps = {
  showSubtitle: false,
};

export default FooterA;
