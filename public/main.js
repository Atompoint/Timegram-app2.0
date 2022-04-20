const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

// IPC initialization (btw electron and react)
require("@electron/remote/main").initialize();

const { APP_NAME } = require("./utils/contants");
const { TrayHandler } = require("./modules/tray");
const { macOS } = require("./modules/macOS");
const { getActiveWindow } = require("./modules/detectWindow");
const { openExternalWindow } = require("./modules/utils");

// ******************** contants ********************
const iconPath = path.join(__dirname, "./Icon.ico");
const CONSTANTS = {
  TRAY: null,
};
let win; // mainwindow
// **************************************************

function createWindow() {
  // create browser window
  win = new BrowserWindow({
    width: 500,
    height: 750,
    webPreferences: {
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
    maximizable: false,
    icon: iconPath,
    title: "Timegram",
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // ******************** hidden apps ********************
  TrayHandler({ CONSTANTS, iconPath, win });
  // *****************************************************
}

app.on("ready", createWindow);          // creates window
app.setAppUserModelId(APP_NAME);        // sets application name on windows
getActiveWindow();                      // ipc
openExternalWindow();                   // ipc
macOS();                                // for Mac OS
