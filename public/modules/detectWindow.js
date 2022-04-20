const { screen, ipcMain } = require("electron");
const activeWindows = require("electron-active-window");

const dectectWindow = () => {
  const mousePos = screen.getCursorScreenPoint();
  return activeWindows()
    .getActiveWindow()
    .then(async (log) => {
      const activeApplicationName = log.windowClass.split(".");
      const process = {
        pid: log.windowPid,
        applicationName: activeApplicationName[0],
        tabName: log.windowName,
        mouse: [mousePos.x, mousePos.y],
        duration: 0,
        idleTime: log.idleTime,
      };
      return process;
    });
};

const getActiveWindow = () => {
  ipcMain.on("GET_ACTIVE_WINDOW", async (e, args) => {
    const data = await dectectWindow();
    if (data !== undefined) {
      e.reply("REPLY", data);
    }
  });
};

module.exports = {
  getActiveWindow
};
