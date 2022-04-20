const { app, BrowserWindow } = require("electron");

const macOS = () => {
  // Quit when all windows are closed
  app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  // open window when icon is clicked but no windows are currently open
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
};

module.exports = {
  macOS,
};
