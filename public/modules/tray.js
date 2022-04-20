const { Tray, nativeImage, app, Menu } = require("electron");
const { APP_NAME, BACKGROUND_MESSAGE } = require("../utils/contants");
const { showNotification } = require("./notifications");

const closeProcess = ({ event, win }) => {
  if (event) {
    event.preventDefault();
  }
  win.hide();
  showNotification(BACKGROUND_MESSAGE);
};

const contextMenu = Menu.buildFromTemplate([
  {
    label: "Exit",
    click() {
      app.quit();
    },
  },
]);

const TrayHandler = ({ CONSTANTS, iconPath, win }) => {
  CONSTANTS.TRAY = new Tray(nativeImage.createFromPath(iconPath));
  CONSTANTS.TRAY.setToolTip(APP_NAME);
  CONSTANTS.TRAY.setContextMenu(contextMenu);
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
