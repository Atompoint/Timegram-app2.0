const { app, dialog, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

var AutoLaunch = require('easy-auto-launch');

// ********** IPC initialization (btw electron and react) **********
require("@electron/remote/main").initialize();

const { APP_NAME, iconPath, updateInterval } = require("./utils/contants");
const { TrayHandler } = require("./modules/tray");
const { macOS } = require("./modules/macOS");
const { getActiveWindow } = require("./modules/detectWindow");
const { openExternalWindow } = require("./modules/utils");

// ******************** contants ********************
const CONSTANTS = {
  TRAY: null,
};
let win; // mainwindow
let updateBeingDownloaded = false;
// **************************************************

function createWindow() {
  // ********** create browser window **********
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

  TrayHandler({ CONSTANTS, win }); // Tray Apps

  if (!isDev) {
    autoUpdater.checkForUpdates();
    setInterval(() => {
      if (!updateBeingDownloaded) {
        autoUpdater.checkForUpdates();
      }
    }, updateInterval);
  }

  // ********** Checking if autoLaunch is enabled, if not then enabling it **********
  let autoLauncher = new AutoLaunch({
    name: "Timegram",
    path: app.getPath("exe"),
    isHidden: false,
  });
  autoLauncher
    .isEnabled()
    .then(function (isEnabled) {
      win.webContents.send("ping", `enabled: ${isEnabled}`);
      win.webContents.send("ping", `path: ${app.getPath("exe")}`);
      if (isEnabled) return;
      autoLauncher.enable();
    })
    .catch(function (err) {
      win.webContents.on("did-finish-load", () => {
        win.webContents.send("ping", err);
      });
      throw err;
    });
  // ********************************************************************************
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // ********** Someone tried to run a second instance, we should focus our window **********
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  // ********** Create myWindow, load the rest of the app, etc... **********

  // ********** check for updates **********
  autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
    updateBeingDownloaded = true;
    const dialogOpts = {
      type: "info",
      buttons: ["Ok"],
      title: "Timegram - Application Update",
      message: process.platform === "win32" ? releaseNotes : releaseName,
      detail: "A new version is being downloaded.",
    };
    dialog.showMessageBox(dialogOpts, (response) => {});
  });

  autoUpdater.logger = log;
  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    win.webContents.send("ping", log_message);
  });

  autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
    win.webContents.send("ping", "update-downloaded triggered");
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Timegram - Application Update",
      message: process.platform === "win32" ? releaseNotes : releaseName,
      detail:
        "A new version has been downloaded. Restart the application to apply the updates.",
    };
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });
  // ***************************************

  app.on("ready", createWindow); // ************ creates window
  app.setAppUserModelId(APP_NAME); // ********** sets application name on windows
  getActiveWindow(); // ************************ ipc (for highlights)
  openExternalWindow(); // ********************* ipc (open in link browser)
  macOS(); // ********************************** for Mac OS
}
