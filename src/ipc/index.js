import { processLogs } from "../utils/functions/processLogs";

// electron modules
const electron = window.require("electron");
const { ipcRenderer } = electron;

export const getActiveWindow = () => {
  ipcRenderer.send("GET_ACTIVE_WINDOW", true);
  ipcRenderer.once("REPLY", (e, args) => {
    processLogs(args);
  });
};
export const openExternal = (url) => {
  ipcRenderer.send("OPEN_EXTERNAL", url);
};
