import React, { useState, useEffect } from "react";
import { Menu, MenuProps } from "@material-ui/core";

export const TPKMenu: React.FC<MenuProps> = ({
  style,
  children,
  ...props
}: MenuProps) => {
  // .. TODO: We need to allow clickthrough to the items behind
  // the menu, but also not disable clicks on the menu itself
  // tried using pointer-events: none but only works in some cases
  // tried using a nested div, which works, but f*ks the layout
  // .. need another solution here

  // const [isHovered, setIsHovered] = useState(false);
  const [allowClick, setAllowClick] = useState(false);

  useEffect(() => {
    console.log(`click is ${!allowClick ? "not" : ""} allowed`);
  }, [allowClick]);

  const handleMouseLeave = () => {
    setAllowClick(false);

    setTimeout(() => setAllowClick(true), 100);
  };

  return (
    <Menu
      {...props}
      style={{
        ...style,
        position: "absolute",
        width: 100,
        height: "100%",
        background: "yellow",
        // pointerEvents: isHovered === true ? "auto" : "none",
      }}
      PaperProps={{
        onMouseLeave: handleMouseLeave,
        style: { background: "red" },
      }}
    >
      <div>{children}</div>
    </Menu>
  );
};
