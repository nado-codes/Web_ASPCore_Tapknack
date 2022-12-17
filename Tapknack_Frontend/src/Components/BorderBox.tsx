import React from "react";

export const BorderBox: React.FC<BorderBoxProps> = ({
  width,
  height,
  borderRadius,
  children,
  style,
}: BorderBoxProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "middle",
      width,
      height,
      border: "2px solid #28ACD9",
      borderRadius: borderRadius ?? 10,
      ...style,
    }}
  >
    {children}
  </div>
);

interface BorderBoxProps {
  width: string | number;
  height: string | number;
  borderRadius?: string | number;
  children?: React.ReactNode[] | React.ReactNode;
  style?: object;
}
