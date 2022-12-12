import React from "react";
import { Button } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import selectGeneric from "../res/select_generic.mp3";
import clickGeneric from "../res/click_generic.mp3";
import { useGlobalStyles } from "../Styles/GlobalStyles";

export const TPKButton: React.FC<Props> = ({
  children,
  theme,
  disabled,
  onClick = () => null,
  style,
}: Props) => {
  const globalStyles = useGlobalStyles(theme);

  const handleHover = () => {
    const _audio = new Audio(selectGeneric);
    _audio.volume = 0.25;
    _audio.play();
  };

  const handleClick = () => {
    const _audio = new Audio(clickGeneric);
    _audio.play();
    onClick();
  };

  return (
    <Button
      className={globalStyles.genericButton}
      disabled={disabled}
      onMouseEnter={handleHover}
      onClick={handleClick}
      style={style}
    >
      {children}
    </Button>
  );
};

interface Props {
  theme?: ClassNameMap<"root" | "link">;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  onClick?: () => void;
  style?: object;
}
