import { Dialog, DialogProps } from "@material-ui/core";
import React from "react";

export const TPKDialog: React.FC<DialogProps> = ({ children, ...props }) => {
  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          backgroundColor: "#000919AA",
          boxShadow: "none",
          width: 500,
          padding: 5,
          overflow: "clip",
        },
      }}
    >
      {children}
    </Dialog>
  );
};
