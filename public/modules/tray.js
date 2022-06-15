const { Tray, nativeImage, app, Menu, ipcMain } = require("electron");
const { APP_NAME, BACKGROUND_MESSAGE } = require("../utils/contants");
const { showNotification } = require("./notifications");
const { iconPath } = require("../utils/contants");

const closeProcess = ({ event, win }) => {
  if (event) {
    event.preventDefault();
  }
  win.hide();
  showNotification(BACKGROUND_MESSAGE);
};

const contextMenu = ({ win }) =>
  Menu.buildFromTemplate([
    {
      label: "Close",
      click() {
        if (win.isVisible()) {
          app.quit();
        } else {
          // ********** upload logs if possible before close **********
          win.webContents.send("forceUpdate");
          setTimeout(() => {
            app.quit();
          }, 3000);
        }
      },
    },
  ]);

const TrayHandler = ({ CONSTANTS, win }) => {
  CONSTANTS.TRAY = new Tray(nativeImage.createFromPath(iconPath));
  CONSTANTS.TRAY.setToolTip(APP_NAME);
  CONSTANTS.TRAY.setContextMenu(contextMenu({ win }));
  CONSTANTS.TRAY.on("click", () => {
    if (win.isVisible()) {
      closeProcess({ win });
    } else {
      win.show();
    }
  });

  win.on("minimize", function (event) {
    closeProcess({ event, win });
  });

  win.on("close", function (event) {
    if (!app.isQuiting && win.isVisible()) {
      closeProcess({ event, win });
    }
    return false;
  });
};

module.exports = {
  TrayHandler,
};
