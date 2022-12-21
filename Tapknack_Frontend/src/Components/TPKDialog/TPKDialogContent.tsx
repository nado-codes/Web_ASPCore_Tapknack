import { ClickAwayListener } from "@material-ui/core";
import DialogContent, {
  DialogContentProps,
} from "@material-ui/core/DialogContent";
import React from "react";

export const TPKDialogContent: React.FC<Props> = ({
  children,
  onClickAway = () => null,
  ...props
}) => {
  const handleClickAway = (_: React.MouseEvent<Document, MouseEvent>) =>
    onClickAway();

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <DialogContent {...props}>{children}</DialogContent>
    </ClickAwayListener>
  );
};

interface Props extends DialogContentProps {
  onClickAway?: () => void;
}
