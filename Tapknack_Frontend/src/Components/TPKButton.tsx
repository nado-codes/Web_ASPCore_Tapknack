import React from "react";
import { Button } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import selectGeneric from "../res/select_generic.mp3";
import clickGeneric from "../res/click_generic.mp3";
import { useGlobalStyles } from "../Styles/GlobalStyles";
import { ButtonProps } from "@material-ui/core/Button";

export const TPKButton: React.FC<Props> = ({
  children,
  theme,
  onClick = () => null,
  ...props
}: Props) => {
  const globalStyles = useGlobalStyles(theme);

  const handleHover = () => {
    const _audio = new Audio(selectGeneric);
    _audio.volume = 0.25;
    _audio.play();
  };

  const handleClick = () => {
    const _audio = new Audio(clickGeneric);
    _audio.volume = 0.5;
    _audio.play();
    onClick();
  };

  return (
    <Button
      {...props}
      className={globalStyles.genericButton}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

interface Props extends ButtonProps {
  theme?: ClassNameMap<"root" | "link">;
  children?: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
}
