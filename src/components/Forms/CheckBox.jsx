import { Checkbox, Form } from "antd";
import React from "react";
import "./style.css";

export const CheckBox = ({
  text,
  onChange,
  checked,
  name,
  propName,
  className,
}) => (
  <Form.Item name={name} valuePropName={propName} className={className}>
    <Checkbox checked={checked} onChange={onChange} name={name}>
      {text}
    </Checkbox>
  </Form.Item>
);
CheckBox.defaultProps = {
  name: "CheckBox",
};
