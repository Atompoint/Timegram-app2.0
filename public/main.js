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
    height: 720,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
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

  TrayHandler({ CONSTANTS, iconPath, win });    // Tray Apps
}

app.on("ready", createWindow);                  // creates window
app.setAppUserModelId(APP_NAME);                // sets application name on windows
getActiveWindow();                              // ipc (for highlights)
openExternalWindow();                           // ipc (open in link browser)
macOS();                                        // for Mac OS
