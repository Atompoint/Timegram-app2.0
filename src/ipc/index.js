import { updateLogFile } from "../utils/functions/logs";

// electron modules
const electron = window.require("electron");
const { ipcRenderer } = electron;

export const getActiveWindow = () => {
  ipcRenderer.send("GET_ACTIVE_WINDOW", true);
  ipcRenderer.once("REPLY", (e, args) => {
    updateLogFile(args);
  });
};
export const openExternal = (url) => {
  ipcRenderer.send("OPEN_EXTERNAL", url);
};

export const forceUpdate = ({ uploading, upload }) => {
  if (uploading) {
    ipcRenderer.on("forceUpdate", function (evt) {
      upload();
    });
  } else {
    ipcRenderer.removeAllListeners("forceUpdate");
  }
};
