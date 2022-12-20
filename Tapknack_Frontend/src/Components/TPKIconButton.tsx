import React, { useState } from "react";
import click1 from "../res/click_1.mp3";
import click2 from "../res/click_2.mp3";
import click4 from "../res/click_4.mp3";
import clickGeneric from "../res/click_generic.mp3";

export const TPKIconButton: React.FC<Props> = ({
  children,
  onMouseEnter = () => null,
  onMouseDown = () => null,
  onClick = () => null,
  onMouseUp = () => null,
  onMouseLeave = () => null,
  style,
}: Props) => {
  const [hover, setHover] = useState<boolean>();
  const [mouseDown, setMouseDown] = useState<boolean>();

  const handleUp = (e: React.MouseEvent) => {
    setMouseDown(false);
    onMouseUp(e);
  };

  const handleHover = (e: React.MouseEvent) => {
    const clicks = [click1, click2, click4];
    const click = clicks[Math.floor(Math.random() * clicks.length)];
    const _audio = new Audio(click);
    _audio.volume = 0.25;
    _audio.play();
    setHover(true);
    onMouseEnter(e);
  };

  const handleDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    onMouseDown(e);
  };

  const handleClick = (e: React.MouseEvent) => {
    const _audio = new Audio(clickGeneric);
    _audio.volume = 0.5;
    _audio.play();
    onClick(e);
  };

  const handleLeave = (e: React.MouseEvent) => {
    setHover(false);
    onMouseLeave(e);
  };

  return (
    <button
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "middle",
        justifyContent: "center",
        marginRight: 1,
        background: "none",
        border: "none",
        filter: `brightness(${hover && !mouseDown ? "130%" : "100%"})`,
        cursor: `${hover ? "pointer" : "default"}`,
        fontWeight: hover && !mouseDown ? "bold" : "normal",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

interface Props {
  children: React.ReactNode | React.ReactNode[];
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  style?: object;
}
