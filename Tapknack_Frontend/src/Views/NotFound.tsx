import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useGlobalStyles } from "../Styles/GlobalStyles";

import tpkIcon from "../res/tpk.png";
import { ClassNameMap } from "@material-ui/styles";
import { PageHelpers } from "../Helpers/PageHelpers";
import { TPKButton } from "../Components/TPKButton";

const TPKIcon = () => (
  <img
    src={tpkIcon}
    alt="TapKnack"
    style={{ width: "250px", height: "250px", objectFit: "contain" }}
  />
);

const NotFound: React.FC<Props> = ({ theme }: Props) => {
  const globalStyles = useGlobalStyles(theme);

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
      }}
    >
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "500px",
          height: "50%",
        }}
      >
        <TPKIcon />
        <Typography
          className={globalStyles.whiteTitle}
          style={{ marginTop: "10px" }}
        >
          Page Not Found
        </Typography>
        <TPKButton
          style={{ width: "300px", marginTop: "20px" }}
          onClick={() => PageHelpers().ReturnToPrevUrl()}
        >
          Take me back!
        </TPKButton>
      </Grid>
    </Grid>
  );
};

interface Props {
  theme: ClassNameMap<"root" | "link">;
}

export default NotFound;
