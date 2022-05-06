import { Rate } from "antd";
import React from "react";
interface PinPros extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export const Pin = (props: PinPros) => {
  const { checked, onCheckedChange, ...restProps } = props;
  return (
    <Rate
      {...restProps}
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
    />
  );
};
