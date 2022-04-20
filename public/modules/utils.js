const { ipcMain, shell } = require("electron");

const openExternalWindow = () => {
  ipcMain.on("OPEN_EXTERNAL", (e, args) => {
    shell.openExternal(args);
  });
};

module.exports = {
  openExternalWindow,
};
