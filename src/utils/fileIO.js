import { LOG_FILE } from "./contants";
import { message } from "antd";
const fs = window.require("fs");
const path = window.require("path");

let errorCountWritetofile = 0;
let errorCountReadLogs = 0;

const isDevelopment = process.env.NODE_ENV !== "production";
const resources_path = isDevelopment? path.resolve('./'): path.dirname(process.execPath);

export const writetofile = (data) => {
  try {
    fs.writeFileSync(`${resources_path}/${LOG_FILE}`, `${JSON.stringify(data)}`, { flag: "w" });
  } catch (error) {
    console.error("writetofile: ", error.message);
    if (errorCountWritetofile % 20 === 0) {
      message.error(`writetofile: Error writing logs`);
    }
    errorCountWritetofile += 1;
  }
};
export const emptyFile = () => {
  try {
    fs.writeFileSync(`${resources_path}/${LOG_FILE}`, `${JSON.stringify({})}`, { flag: "w" });
  } catch (error) {
    console.error("emptyFile: ", error.message);
    message.error(`emptyFile: Error emptying logs`);
  }
};
export const readLogs = () => {
  try {
    console.log(`resources_path: `, resources_path);
    const rawdata = fs.readFileSync(`${resources_path}/${LOG_FILE}`);
    const data = JSON.parse(rawdata);
    return data;
  } catch (error) {
    console.error("readLogs: ", error.message);
    if (errorCountReadLogs % 20 === 0) {
      message.error(`readLogs: Error reading logs`);
    }
    errorCountReadLogs += 1;
  }
};
