const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

// IPC initialization (btw electron and react)
require("@electron/remote/main").initialize();

function createWindow() {
  // create browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

// ******************** for MAC OS ********************
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
// ****************************************************
