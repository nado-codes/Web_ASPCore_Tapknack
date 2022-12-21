import { DialogTitle, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
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

export const Profile: React.FC = () => {
  const globalStyles = useGlobalStyles();
  const { username } = localStorage;
  const labelMinWidth = 185;

  const [changeUsernameIsLoading, setChangeUsernameIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [changeUsernameDialogIsOpen, setChangeUsernameDialogIsOpen] =
    useState(false);

  const [changePassIsLoading, setChangePassIsLoading] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [changePassDialogIsOpen, setChangePassDialogIsOpen] = useState(true);

  const [changeAvatarIsLoading, setChangeAvatarIsLoading] = useState(false);
  const [changeAvatarDialogIsOpen, setChangeAvatarDialogIsOpen] =
    useState(false);

  const skills = Array.from(Array(6).keys()).map((n) => ({
    name: `Unity 3D ${n}`,
  }));

  const handleChangeUsername = async () => {
    try {
      setChangeUsernameIsLoading(true);
      setChangeUsernameDialogIsOpen(false);
    } catch (e) {
    } finally {
      setChangeUsernameIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setChangePassIsLoading(true);
      setChangePassDialogIsOpen(false);
    } catch (e) {
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
      {/* Change Username Dialog */}
      <TPKDialog open={changeUsernameDialogIsOpen}>
        <DialogTitle>
          <Typography className={globalStyles.whiteTitle}>
            Enter A New Username
          </Typography>
        </DialogTitle>
        <TPKDialogContent
          onClickAway={() => setChangeUsernameDialogIsOpen(false)}
          style={{ height: 100 }}
        >
          <Typography className={globalStyles.white16} style={{ fontSize: 20 }}>
            Nado is the best developer in history
          </Typography>
          <TPKFormField
            label="Create Your Username"
            type="text"
            disabled={changeUsernameIsLoading}
            value={newUsername}
            labelMinWidth={labelMinWidth}
            onChange={setNewUsername}
          />
        </TPKDialogContent>
        <TPKDialogActions>
          <TPKButton onClick={handleChangeUsername}>Accept</TPKButton>
          <TPKButton onClick={() => setChangeUsernameDialogIsOpen(false)}>
            Cancel
          </TPKButton>
        </TPKDialogActions>
      </TPKDialog>
      {/* Change Password Dialog */}
      <TPKDialog open={changePassDialogIsOpen}>
        <DialogTitle>Enter A New Password</DialogTitle>
        <TPKDialogContent onClickAway={() => setChangePassDialogIsOpen(false)}>
          <Typography className={globalStyles.white16} style={{ fontSize: 20 }}>
            Nado is the best developer in history
          </Typography>
          <TPKFormField
            label="Enter Your Old Password"
            type="password"
            disabled={changePassIsLoading}
            value={oldPass}
            labelMinWidth={labelMinWidth}
            onChange={setOldPass}
          />
          <TPKFormField
            label="Create Your Password"
            type="password"
            disabled={changePassIsLoading}
            value={newPass}
            labelMinWidth={labelMinWidth}
            onChange={setNewPass}
          />
          <TPKFormField
            label="Confirm Your Password"
            type="password"
            disabled={changePassIsLoading}
            value={confPass}
            labelMinWidth={labelMinWidth}
            onChange={setConfPass}
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
      {/* Change Avatar Dialog */}
      <TPKDialog open={changeAvatarDialogIsOpen}>
        <DialogTitle>Select A New Avatar</DialogTitle>
        <TPKDialogContent
          onClickAway={() => setChangeAvatarDialogIsOpen(false)}
        >
          <Typography className={globalStyles.white16} style={{ fontSize: 20 }}>
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
          <TPKButton
            onClick={() => setChangePassDialogIsOpen(true)}
            style={{ marginTop: 10 }}
          >
            Change Password
          </TPKButton>
          <TPKButton
            onClick={() => setChangeAvatarDialogIsOpen(true)}
            style={{ marginTop: 10 }}
          >
            Change Avatar
          </TPKButton>
        </Grid>
      </Grid>
    </>
  );
};
