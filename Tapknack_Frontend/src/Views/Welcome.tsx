import React from "react";
import { Grid } from "@material-ui/core";

import TPKIcon, { TPK } from "../res/iconTPK";
import { TPKIconButton } from "../Components/TPKIconButton";

const BlueCircle: React.FC<IconCircleProps> = ({
  size = "48px",
  children,
}: IconCircleProps) => (
  <div
    style={{
      display: "flex",
      alignItems: "middle",
      justifyContent: "center",
      width: size,
      height: size,
      margin: "auto",
      background: "#28ACD9",
      borderRadius: 100,
    }}
  >
    {children}
  </div>
);

interface IconCircleProps {
  size?: string | number;
  children?: React.ReactNode[] | React.ReactNode;
}

const BorderCircle: React.FC<BorderCircleProps> = ({
  size = 48,
  children,
  style,
}: BorderCircleProps) => (
  <div
    style={{
      width: size,
      height: size,
      display: "flex",
      justifyContent: "center",
      alignItems: "middle",
      border: "2px solid #28ACD9",
      borderRadius: 100,
      ...style,
    }}
  >
    {children}
  </div>
);

interface BorderCircleProps {
  size?: string | number;
  children?: React.ReactNode[] | React.ReactNode;
  style?: object;
}

const BorderBox: React.FC<BorderBoxProps> = ({
  width,
  height,
  children,
  style,
}: BorderBoxProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "middle",
      width,
      height,
      border: "2px solid #28ACD9",
      borderRadius: 10,
      ...style,
    }}
  >
    {children}
  </div>
);

interface BorderBoxProps {
  width: string | number;
  height: string | number;
  children?: React.ReactNode[] | React.ReactNode;
  style?: object;
}

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
          borderBottom: "2px solid rgba(40,172,217,.5)",
          alignItems: "center",
        }}
      >
        {/* Logo - TapKnack */}
        <Grid item style={{ flex: 0.5 }}>
          <TPKIcon size={75} icon={TPK.TPK} />
        </Grid>
        {/* Button Notifications, Logout, Profile, Options */}
        <Grid
          item
          style={{
            flex: 0.5,
            display: "flex",
            alignContent: "middle",
          }}
        >
          <TPKIconButton>
            <TPKIcon size={45} icon={TPK.icNotification} />
          </TPKIconButton>
          <TPKIconButton>
            <TPKIcon size={45} icon={TPK.icLogout} />
          </TPKIconButton>
          <TPKIconButton>
            <TPKIcon size={45} icon={TPK.icProfile} />
          </TPKIconButton>
          <TPKIconButton>
            <TPKIcon size={45} icon={TPK.icOptions} />
          </TPKIconButton>
        </Grid>
      </Grid>
      {/* Center panel*/}
      <Grid
        item
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "10px",
        }}
      >
        {/* Welcome message */}
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "middle",
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TPKIcon size={64} icon={TPK.icProfile} />
          <h1
            style={{
              color: "white",
              marginLeft: 20,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Nathan - Welcome Back!
          </h1>
        </Grid>

        {/* News */}
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "white", textAlign: "center" }}>
            Here's some stuff you missed...
          </p>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              borderBottom: "2px solid rgba(40,172,217,.5)",
              borderTop: "2px solid rgba(40,172,217,.5)",
              paddingTop: 10,
              paddingBottom: 10,
              width: "75%",
              margin: "auto",
            }}
          >
            <TPKIconButton>
              <BorderBox width={150} height={100} style={{ marginRight: 10 }}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  News 1
                </p>
              </BorderBox>
            </TPKIconButton>
            <TPKIconButton>
              <BorderBox width={150} height={100} style={{ marginRight: 10 }}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  News 2
                </p>
              </BorderBox>
            </TPKIconButton>
            <TPKIconButton>
              <BorderBox width={150} height={100}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  News 3
                </p>
              </BorderBox>
            </TPKIconButton>
          </Grid>
        </Grid>
        {/* Button List Job, Find Job, Find Person */}
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "white", textAlign: "center" }}>
            What would you like to do first?
          </p>
          <Grid item style={{ display: "flex", justifyContent: "center" }}>
            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TPKIconButton>
                <BorderCircle size={200}>
                  <TPKIcon
                    size={128}
                    icon={TPK.icSuitcasePlus}
                    style={{ margin: "auto" }}
                  />
                </BorderCircle>
                <p
                  style={{
                    color: "white",
                    fontSize: 22,
                    margin: "auto",
                  }}
                >
                  List A Job
                </p>
              </TPKIconButton>
            </Grid>
            <TPKIconButton>
              <BorderCircle style={{ marginRight: 10 }} size={200}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  Find A Job
                </p>
              </BorderCircle>
            </TPKIconButton>
            <TPKIconButton>
              <BorderCircle style={{ marginRight: 10 }} size={200}>
                <p style={{ color: "white", margin: "auto", fontSize: 22 }}>
                  Find A Person
                </p>
              </BorderCircle>
            </TPKIconButton>
          </Grid>
        </Grid>
      </Grid>
      {/* Footer */}
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
