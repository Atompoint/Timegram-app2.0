const { ipcMain, shell } = require("electron");

const openExternalWindow = () => {
  ipcMain.on("OPEN_EXTERNAL", (e, args) => {
    shell.openExternal(args);
  });
};

const processName = (name) => {
  return name
    .replace(/[^a-zA-Z0-9/-/.| ]+/g, "")
    .replace(/ *\([^)]*\) */g, "")
    .trim();
};

module.exports = {
  openExternalWindow,
  processName,
};
