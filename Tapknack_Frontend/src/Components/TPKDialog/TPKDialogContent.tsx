// import { ClickAwayListener } from "@material-ui/core";
import DialogContent, {
  DialogContentProps,
} from "@material-ui/core/DialogContent";
import React from "react";

export const TPKDialogContent: React.FC<Props> = ({
  children,
  onClickAway = () => null,
  ...props
}) => {
  // TODO: re-add the clickaway listener once we have more time..
  // commenting out due to time constraints
  /* const handleClickAway = (_: React.MouseEvent<Document, MouseEvent>) =>
    onClickAway(); */

  return <DialogContent {...props}>{children}</DialogContent>;
};

interface Props extends DialogContentProps {
  onClickAway?: () => void;
}
