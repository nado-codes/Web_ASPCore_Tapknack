import { DialogTitle, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as DOMPurify from "dompurify";

import { BorderBox } from "../Components/BorderBox";
import TPKFormField from "../Components/TPKFormField";
import { BtnBack } from "../Components/Profile/BtnBack";
import { SkillButton } from "../Components/SkillButton";
import { TPKButton } from "../Components/TPKButton";
import { TPKDialog } from "../Components/TPKDialog/TPKDialog";
import { TPKDialogActions } from "../Components/TPKDialog/TPKDialogActions";
import { TPKDialogContent } from "../Components/TPKDialog/TPKDialogContent";
import { TPKHeader } from "../Components/TPKHeader";
import { PageHelpers } from "../Helpers/PageHelpers";
import TPKIcon, { TPK } from "../res/iconTPK";
import { useGlobalStyles } from "../Styles/GlobalStyles";
import { ErrorHelpers } from "../Helpers/ErrorHelpers";
import { TPKDialogError } from "../Components/TPKDialog/TPKDialogError";
import { AuthenticationHelpers } from "../Helpers/AuthenticationHelpers";

export const Profile: React.FC = () => {
  const globalStyles = useGlobalStyles();
  const { username } = localStorage;
  const labelMinWidth = 185;

  const [changeUsernameDialogIsOpen, setChangeUsernameDialogIsOpen] =
    useState(false);
  const [changeUsernameIsLoading, setChangeUsernameIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [changeUsernameError, setChangeUsernameError] = useState("");

  const [changePassDialogIsOpen, setChangePassDialogIsOpen] = useState(false);
  const [changePassIsLoading, setChangePassIsLoading] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  const [changeAvatarDialogIsOpen, setChangeAvatarDialogIsOpen] =
    useState(false);
  const [changeAvatarIsLoading, setChangeAvatarIsLoading] = useState(false);

  // .. TODO: get the user of the profile entered in the url e.g. "nadotornado"
  // .. and display its info on the page
  const skills = Array.from(Array(6).keys()).map((n) => ({
    name: `Unity 3D ${n}`,
  }));

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        const isAuthorized = await AuthenticationHelpers().Authenticate();
        !isAuthorized && PageHelpers().GotoUrl("/signin");
      } catch (err) {
        PageHelpers().GotoUrl("/signin");
      }
    };

    loadDataAsync();
  }, []);

  const handleNewUsernameChanged = (value: string) => {
    try {
      if (value.length > 60) throw Error(`USERNAME_LENGTH`);
    } catch (e) {
      const message = ErrorHelpers().GetErrorMessage(e);

      switch (message) {
        case "USERNAME_LENGTH":
          setChangeUsernameError("Usernames must be 60 characters or less");
          break;
        default:
          setChangeUsernameError(message);
          break;
      }
    } finally {
      setNewUsername(value);
    }
  };

  const handleNewPassChanged = (value: string) => {
    try {
    } catch (err) {
    } finally {
      setNewPass(value);
    }
  };

  const handleConfPassChanged = (value: string) => {
    try {
    } catch (err) {
    } finally {
      setConfPass(value);
    }
  };

  const handleChangeUsername = async () => {
    try {
      setChangeUsernameIsLoading(true);

      if (newUsername === "") throw Error(`USERNAME_NULL`);

      if (newUsername !== DOMPurify.sanitize(newUsername)) {
        throw Error(`USERNAME_HTML`);
      }

      const { data: rowsUpdated } = await axios.put(`api/users/`, {});

      if (rowsUpdated < 1) throw Error(`NO_UPDATE`);

      setChangeUsernameDialogIsOpen(false);
    } catch (err) {
      const message = ErrorHelpers().GetErrorMessage(err);

      switch (message) {
        case "USERNAME_NULL":
          setChangeUsernameError(`Please provide a username`);
          break;
        case "PASS_NULL":
          setChangeUsernameError(`Please provide a password`);
          break;
        case "CONFPASS_NULL":
          setChangeUsernameError(`Please confirm your password`);
          break;
        case "USERNAME_HTML":
          setChangeUsernameError(`Please enter a valid username`);
          break;
        case "EMAIL_HTML":
          setChangeUsernameError(`Please enter a valid email`);
          break;
        case "PASS_NO_MATCH":
          setChangeUsernameError(`The passwords do not match`);
          break;
        case "USERNAME_DUPLICATE":
          setChangeUsernameError(`That username is already in use`);
          break;
        default:
          setChangeUsernameError(
            message.includes("_") ? message : "Unknown Error"
          );
      }

      console.error(err);
      console.error(message);
    } finally {
      setChangeUsernameIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setChangePassIsLoading(true);

      if (newPass === "") throw Error(`PASS_NULL`);
      if (confPass === "") throw Error(`CONFPASS_NULL`);
      if (newPass !== confPass) throw Error(`PASS_NO_MATCH`);

      setChangePassDialogIsOpen(false);
    } catch (err) {
      const message = ErrorHelpers().GetErrorMessage(err);

      switch (message) {
        case "PASS_NULL":
          setChangePasswordError(`Please provide a password`);
          break;
        case "CONFPASS_NULL":
          setChangePasswordError(`Please confirm your password`);
          break;
        case "PASSWORD_FAIL":
          setChangePasswordError(`You entered the wrong password`);
        case "PASS_NO_MATCH":
          setChangePasswordError(`The passwords do not match`);
          break;
        default:
          setChangePasswordError(
            message.includes("_") ? message : "Unknown Error"
          );
      }
    } finally {
      setChangePassIsLoading(false);
    }
  };

  const handleChangeAvatar = async () => {
    try {
      console.log("changeAvatarIsLoading=", changeAvatarIsLoading);
      setChangeAvatarIsLoading(true);
      setChangeAvatarDialogIsOpen(false);
    } catch (e) {
    } finally {
      setChangeAvatarIsLoading(false);
    }
  };

  return (
    <>
      <TPKHeader />
      <Grid
        container
        style={{
          display: "flex",
          paddingTop: 75,
        }}
      >
        <Grid
          item
          style={{
            flex: 1 / 3,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {/* Back (Return) Button */}
          <BtnBack onClick={() => PageHelpers().ReturnToPrevUrl()} />
        </Grid>
        <Grid
          item
          style={{
            flex: 1 / 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Avatar + Skills*/}
          <BorderBox width={500} height={600} borderRadius={25}>
            <Grid
              container
              direction={"column"}
              style={{ display: "flex", padding: 20 }}
            >
              {/* Avatar + Username */}
              <Grid
                container
                style={{
                  flex: 1 / 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid item>
                  <TPKIcon size={125} icon={TPK.icProfile} />
                </Grid>
                <Grid
                  item
                  style={{
                    paddingLeft: 10,
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    className={globalStyles.whiteTitle}
                    style={{
                      fontSize: 50,
                      marginTop: 0,
                      maxWidth: 50,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {username}
                    {/* TODO: need to be able to handle 60-character long strings without overflowing (use ellipsis) Sixty Sixty Sixty Sixty Sixty Sixty Sixty Sixty
                    Sixty Sixty Sixty */}
                  </Typography>
                </Grid>
              </Grid>
              {/* Skills */}
              <Grid
                container
                direction={"column"}
                style={{ flex: 3 / 4, display: "flex" }}
              >
                <Grid item style={{ height: 30, width: "100%" }}>
                  <Typography
                    className={globalStyles.white16}
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
                  {skills.map((s, i) => (
                    <Grid key={i} item style={{ marginTop: 10 }}>
                      <SkillButton name={s.name} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </BorderBox>
        </Grid>
        <Grid
          item
          style={{
            flex: 1 / 3,
            display: "flex",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <TPKButton onClick={() => setChangeUsernameDialogIsOpen(true)}>
            Change Username
          </TPKButton>
          {/* Change Username Dialog */}
          <TPKDialog open={changeUsernameDialogIsOpen}>
            <DialogTitle>
              <Typography className={globalStyles.whiteTitle}>
                Enter A New Username
              </Typography>
            </DialogTitle>
            <TPKDialogContent
              // onClickAway={() => setChangeUsernameDialogIsOpen(false)}
              style={{ height: 100 }}
            >
              <TPKDialogError value={changeUsernameError} />
              <TPKFormField
                label="Create Your Username"
                type="text"
                disabled={changeUsernameIsLoading}
                value={newUsername}
                labelMinWidth={labelMinWidth}
                onChange={handleNewUsernameChanged}
                style={{ fontSize: 20 }}
              />
            </TPKDialogContent>
            <TPKDialogActions>
              <TPKButton onClick={handleChangeUsername}>Accept</TPKButton>
              <TPKButton onClick={() => setChangeUsernameDialogIsOpen(false)}>
                Cancel
              </TPKButton>
            </TPKDialogActions>
          </TPKDialog>

          <TPKButton
            onClick={() => setChangePassDialogIsOpen(true)}
            style={{ marginTop: 10 }}
          >
            Change Password
          </TPKButton>
          {/* Change Password Dialog */}
          <TPKDialog open={changePassDialogIsOpen}>
            <DialogTitle>
              <Typography className={globalStyles.whiteTitle}>
                Enter A New Password
              </Typography>
            </DialogTitle>
            <TPKDialogContent
              onClickAway={() => setChangePassDialogIsOpen(false)}
              style={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              <TPKDialogError value={changePasswordError} />
              <TPKFormField
                label="Enter Your Old Password"
                type="password"
                disabled={changePassIsLoading}
                value={oldPass}
                labelMinWidth={labelMinWidth}
                onChange={setOldPass}
                style={{ fontSize: 20 }}
              />
              <TPKFormField
                label="Create Your Password"
                type="password"
                disabled={changePassIsLoading}
                value={newPass}
                labelMinWidth={labelMinWidth}
                onChange={handleNewPassChanged}
                style={{ fontSize: 20 }}
              />
              <TPKFormField
                label="Confirm Your Password"
                type="password"
                disabled={changePassIsLoading}
                value={confPass}
                labelMinWidth={labelMinWidth}
                onChange={handleConfPassChanged}
                style={{ fontSize: 20 }}
              />
            </TPKDialogContent>
            <TPKDialogActions>
              <TPKButton onClick={handleChangePassword} style={{ width: 75 }}>
                Accept
              </TPKButton>
              <TPKButton
                onClick={() => setChangePassDialogIsOpen(false)}
                style={{ width: 75 }}
              >
                Cancel
              </TPKButton>
            </TPKDialogActions>
          </TPKDialog>

          <TPKButton
            onClick={() => setChangeAvatarDialogIsOpen(true)}
            disabled
            style={{ marginTop: 10 }}
          >
            Change Avatar
          </TPKButton>
          {/* Change Avatar Dialog */}
          <TPKDialog open={changeAvatarDialogIsOpen}>
            <DialogTitle>Select A New Avatar</DialogTitle>
            <TPKDialogContent
              onClickAway={() => setChangeAvatarDialogIsOpen(false)}
            >
              <Typography
                className={globalStyles.white16}
                style={{ fontSize: 20 }}
              >
                Nado is the best developer in history
              </Typography>
            </TPKDialogContent>
            <TPKDialogActions>
              <TPKButton onClick={handleChangeAvatar}>Accept</TPKButton>
              <TPKButton onClick={() => setChangeAvatarDialogIsOpen(false)}>
                Cancel
              </TPKButton>
            </TPKDialogActions>
          </TPKDialog>
        </Grid>
      </Grid>
    </>
  );
};
