import {
  Grid,
  Menu,
  ClickAwayListener,
  MenuItem,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import { useGlobalStyles } from "../Styles/GlobalStyles";
import { PageHelpers } from "../Helpers/PageHelpers";
import TPKIcon from "../res/iconTPK";
import TPK from "../res/_iconTPK";
import { TPKButton } from "./TPKButton";
import { TPKIconButton } from "./TPKIconButton";
import { TPKDialog } from "./TPKDialog/TPKDialog";
import { TPKDialogContent } from "./TPKDialog/TPKDialogContent";
import { TPKDialogActions } from "./TPKDialog/TPKDialogActions";

export const TPKHeader: React.FC = () => {
  const globalStyles = useGlobalStyles();

  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<Element>();
  const [optionsAnchorEl, setOptionsAnchorEl] = useState<Element>();

  const [logoutPromptIsOpen, setLogoutPromptIsOpen] = useState(false);
  const [notificationsIsOpen, setNotificationsIsOpen] = useState(false);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  const handleNotificationsClicked = (e: React.MouseEvent) => {
    setNotificationsAnchorEl(e.currentTarget);
    setNotificationsIsOpen(true);
  };

  const handleOptionsClicked = (e: React.MouseEvent) => {
    setOptionsAnchorEl(e.currentTarget);
    setOptionsIsOpen(true);
  };

  const handleLogout = () => {
    delete localStorage.token;
    PageHelpers().GotoUrl("/signin");
    setLogoutPromptIsOpen(false);
  };

  return (
    <>
      <TPKDialog open={logoutPromptIsOpen}>
        <DialogTitle>Title</DialogTitle>
        <TPKDialogContent
          onClickAway={() => setLogoutPromptIsOpen(false)}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography className={globalStyles.white16} style={{ fontSize: 20 }}>
            Are you sure you want to log out?
          </Typography>
        </TPKDialogContent>
        <TPKDialogActions>
          <TPKButton
            onClick={() => handleLogout()}
            style={{
              marginTop: "50px",
              width: "150px",
            }}
          >
            Yes
          </TPKButton>
          <TPKButton
            onClick={() => setLogoutPromptIsOpen(false)}
            style={{
              marginTop: "50px",
              width: "150px",
            }}
          >
            No
          </TPKButton>
        </TPKDialogActions>
      </TPKDialog>
      <Grid
        container
        style={{
          display: "flex",
        }}
      >
        <Grid
          item
          style={{
            flex: 1 / 2,
          }}
        />
        <Grid
          item
          style={{
            display: "flex",
            flex: 1 / 2,
          }}
        >
          <Grid
            item
            style={{
              flex: 1 / 2,
              marginLeft: -37.5,
            }}
          >
            <TPKIcon size={75} icon={TPK.TPK} />
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flex: 1 / 2,
              justifyContent: "end",
              paddingTop: "auto",
              borderBottom: "2px solid rgba(40,172,217,.5)",
            }}
          >
            <TPKIconButton
              onClick={handleNotificationsClicked}
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <TPKIcon size={45} icon={TPK.icNotification} />
            </TPKIconButton>
            <Menu
              open={notificationsIsOpen}
              anchorEl={notificationsAnchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <ClickAwayListener
                onClickAway={() => setNotificationsIsOpen(false)}
              >
                <MenuItem>Nado Is The Best Developer In History</MenuItem>
              </ClickAwayListener>
            </Menu>

            <TPKIconButton
              style={{ marginTop: "auto", marginBottom: "auto" }}
              onClick={() => setLogoutPromptIsOpen(true)}
            >
              <TPKIcon size={45} icon={TPK.icLogout} />
            </TPKIconButton>
            <TPKIconButton
              onClick={() => PageHelpers().GotoUrl(`/profile/nadotornado`)}
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <TPKIcon size={45} icon={TPK.icProfile} />
            </TPKIconButton>
            <TPKIconButton
              onClick={handleOptionsClicked}
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <TPKIcon size={45} icon={TPK.icOptions} />
            </TPKIconButton>

            <Menu
              open={optionsIsOpen}
              anchorEl={optionsAnchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <ClickAwayListener onClickAway={() => setOptionsIsOpen(false)}>
                <MenuItem>Nado Is The Best Developer In History</MenuItem>
              </ClickAwayListener>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
