import React from "react";
import { Form, Input } from "antd";

const validation = {
  email: {
    required: true,
    type: "email",
    message: "Please enter a valid email",
  },
  password: {
    required: true,
    message: "Please enter a Password",
  },
  setpassword: [
    {
      required: true,
      message: "Please enter a Password",
    },
    {
      min: 6,
      message: "Password must be minimum 6 characters",
    },
  ],
  resetPassword: {
    min: 6,
    message: "Password must be minimum 6 characters",
  },

  companyName: {
    required: true,
    message: "Please enter your company Name",
  },
  FullName: {
    required: true,
    message: "Please enter your full name",
  },
};

export const TextBox = ({
  label,
  placeholder,
  type,
  validationKey,
  name,
  hasFeedback,
  dependencies,
  className,
}) => {
  const validator = validation[validationKey];
  return (
    <Form.Item
      label={label}
      rules={[validator]}
      name={name}
      hasFeedback={hasFeedback}
      dependencies={dependencies !== undefined && [dependencies]}
      validateTrigger="onBlur"
      className={className}
    >
      {type !== "password" ? (
        <Input placeholder={placeholder} type={type} className="success" />
      ) : (
        <Input.Password placeholder={placeholder} className="success password"  />
      )}
    </Form.Item>
  );
};

TextBox.defaultProps = {
  type: "text",
  placeholder: "PlaceHolder",
  hasFeedback: false,
  dependencies: "",
  customRule: undefined,
};
