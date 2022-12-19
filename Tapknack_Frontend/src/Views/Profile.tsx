import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { BorderBox } from "../Components/BorderBox";
import { SkillButton } from "../Components/SkillButton";
import { TPKHeader } from "../Components/TPKHeader";
import { TPKIconButton } from "../Components/TPKIconButton";
import { PageHelpers } from "../Helpers/PageHelpers";
import TPKIcon, { TPK } from "../res/iconTPK";
import { useGlobalStyles } from "../Styles/GlobalStyles";

export const Profile: React.FC = () => {
  const globalClasses = useGlobalStyles();
  const { username } = localStorage;

  const skills = Array.from(Array(6).keys()).map((n) => ({
    name: `Unity 3D ${n}`,
  }));

  return (
    <>
      <TPKHeader />
      <Grid container style={{ display: "flex", paddingTop: 75 }}>
        <Grid
          item
          style={{
            flex: 1 / 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Back (Return) Button */}
          <TPKIconButton onClick={() => PageHelpers().ReturnToPrevUrl()}>
            <TPKIcon size={75} icon={TPK.icProfile} />
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
            <Grid
              container
              direction={"column"}
              style={{ display: "flex", padding: 20 }}
            >
              {/* Avatar + Username */}
              <Grid container style={{ flex: 1 / 3 }}>
                <Grid item>
                  <TPKIcon size={125} icon={TPK.icProfile} />
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                  }}
                >
                  <h1
                    style={{
                      fontSize: 50,
                      color: "white",
                      marginTop: 20,
                      width: 50,
                    }}
                  >
                    {username}
                  </h1>
                </Grid>
              </Grid>
              {/* Skills */}
              <Grid
                container
                direction={"column"}
                style={{ flex: 2 / 3, display: "flex" }}
              >
                <Grid item style={{ height: 30, width: "100%" }}>
                  <Typography
                    className={globalClasses.white16}
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Your Skills
                  </Typography>
                </Grid>
                <Grid
                  container
                  style={{
                    maxHeight: 300,
                    overflow: "hidden",
                  }}
                >
                  {skills.map((s) => (
                    <Grid item style={{ marginTop: 10 }}>
                      <SkillButton name={s.name} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </BorderBox>
        </Grid>
      </Grid>
    </>
  );
};
