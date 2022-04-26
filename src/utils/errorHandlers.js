import { message, notification } from "antd";

export function asyncErrorHandler(error) {
  notification.error({
    message: error.message,
    className: "antdNotification",
  });
}
