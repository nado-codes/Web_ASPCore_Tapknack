import React, { useState } from "react";

export const TPKIconButton: React.FC<Props> = ({
  children,
  onClick = () => null,
  style,
}: Props) => {
  const [hover, setHover] = useState<boolean>();
  const [mouseDown, setMouseDown] = useState<boolean>();

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onClick={onClick}
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
  onClick?: () => void;
  style?: object;
}
