import { Grid } from "@material-ui/core";
import React from "react";
import { BorderBox } from "../Components/BorderBox";
import { TPKHeader } from "../Components/TPKHeader";
import { TPKIconButton } from "../Components/TPKIconButton";
import { PageHelpers } from "../Helpers/PageHelpers";
import TPKIcon, { TPK } from "../res/iconTPK";

export const Profile: React.FC = () => {
  const { username } = localStorage;

  return (
    <>
      <TPKHeader />
      <Grid container style={{ display: "flex", height: "100%" }}>
        <Grid
          item
          style={{
            flex: 1 / 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TPKIconButton onClick={() => PageHelpers().ReturnToPrevUrl()}>
            <TPKIcon size={45} icon={TPK.icProfile} />
          </TPKIconButton>
        </Grid>
        <Grid
          item
          style={{
            flex: 4 / 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Avatar + Skills*/}
          <BorderBox width={500} height={500} borderRadius={25}>
            <Grid container direction={"column"}>
              <Grid item direction={"row"} style={{ backgroundColor: "red" }}>
                <Grid item>
                  <TPKIcon size={100} icon={TPK.icProfile} />
                </Grid>
                <Grid item>
                  <h1
                    style={{
                      color: "white",
                      background: "yellow",
                      marginTop: "auto",
                      marginBottom: "auto",
                      width: 50,
                    }}
                  >
                    {username}
                  </h1>
                </Grid>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </BorderBox>
        </Grid>
      </Grid>
    </>
  );
};
