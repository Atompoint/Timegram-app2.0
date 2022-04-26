import { LOG_FILE } from "./contants";
const fs = window.require("fs");
const path = window.require("path");

export const writetofile = (data) => {
  try {
    fs.writeFileSync(LOG_FILE, `${JSON.stringify(data)}`, { flag: "w" });
  } catch (error) {
    console.log(error.message);
  }
};
export const emptyFile = () => {
  try {
    fs.writeFileSync(LOG_FILE, `${JSON.stringify({})}`, { flag: "w" });
  } catch (error) {
    console.log(error.message);
  }
};
export const readLogs = () => {
  try {
    const rawdata = fs.readFileSync(path.resolve("", LOG_FILE));
    const data = JSON.parse(rawdata);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
