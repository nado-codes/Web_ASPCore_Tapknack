import { DialogActions, DialogActionsProps } from "@material-ui/core";
import React from "react";

export const TPKDialogActions: React.FC<DialogActionsProps> = ({
  children,
  ...props
}) => {
  return (
    <DialogActions
      {...props}
      style={{ display: "flex", justifyContent: "center" }}
    >
      {children}
    </DialogActions>
  );
};
