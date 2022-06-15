const { Notification } = require("electron");
const { iconPath } = require("../utils/contants");

function showNotification({ title, body }) {
  new Notification({
    title: title,
    body: body,
    icon: iconPath
  }).show();
}

module.exports = {
  showNotification,
};
