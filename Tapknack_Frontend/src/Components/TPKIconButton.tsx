import React, { useState } from "react";
import click1 from "../res/click_1.mp3";
import click2 from "../res/click_2.mp3";
import click4 from "../res/click_4.mp3";
import clickGeneric from "../res/click_generic.mp3";

export const TPKIconButton: React.FC<Props> = ({
  children,
  onClick = () => null,
  style,
}: Props) => {
  const [hover, setHover] = useState<boolean>();
  const [mouseDown, setMouseDown] = useState<boolean>();

  const handleHover = () => {
    const clicks = [click1, click2, click4];
    const click = clicks[Math.floor(Math.random() * clicks.length)];
    const _audio = new Audio(click);
    _audio.volume = 0.25;
    _audio.play();
    setHover(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const _audio = new Audio(clickGeneric);
    _audio.volume = 0.5;
    _audio.play();
    onClick(e);
  };

  return (
    <button
      onMouseEnter={handleHover}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
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
  onClick?: (e: React.MouseEvent) => void;
  style?: object;
}
