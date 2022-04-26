import { Button, Switch } from "antd";
import React from "react";
import "./style.css";

export const SimpleButton = ({ size, type, shape, text, onClick, hType }) => (
  <Button
    block
    type={type}
    shape={shape}
    size={size}
    onClick={onClick}
    htmlType={hType}
    className="primary button"
  >
    {text}
  </Button>
);
SimpleButton.defaultProps = {
  size: "default",
  type: "primary",
  text: "Button",
  hType: "button",
};

export const LinkButton = ({
  text,
  size,
  block,
  className,
  click,
  icon,
  iconName,
}) =>
  !icon ? (
    <Button
      block={block}
      size={size}
      className={`${className} text-green button`}
      type="link"
      onClick={click}
    >
      {text}
    </Button>
  ) : (
    <Button
      block={block}
      size={size}
      className={`${className} button`}
      type="link"
      onClick={click}
    >
      <span> {iconName}</span>
      <span>{text}</span>
    </Button>
  );

LinkButton.defaultProps = {
  size: "middle",
  text: "Button",
  icon: false,
};

export const SwitchButton = ({ checked, onChange, className }) => (
  <Switch
    className={className}
    checkedChildren="On"
    unCheckedChildren="Off"
    checked={checked}
    onChange={onChange}
  />
);
