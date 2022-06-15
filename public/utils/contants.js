const path = require("path");

module.exports = {
  APP_NAME: "Timegram",
  BACKGROUND_MESSAGE: {
    title: "Running",
    body: "Timegram is running in the background",
  },
  iconPath: path.join(__dirname, "../icon.ico"),
  updateInterval: 1000 * 60 * 1, // 1mins
};
