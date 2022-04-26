import moment from "moment";
import { readLogs, writetofile } from "../fileIO";
import { hashGenerator } from "./hashGenerator";

export const processLogs = (log) => {
  let processes = readLogs() || {};

  const processKey = `${hashGenerator(log.tabName)}-${log.pid}`;
  if (!processes[processKey]) {
    const object = {
      key: processKey,
      pid: log.pid,
      applicationName: log.applicationName,
      tabName: log.tabName,
      startTime: moment(),
      endTime: moment(),
      // mouse: log.mouse,                                            // future use
      duration: 0,
    };
    processes[processKey] = object;
  } else {
    // if idle time is less than 120 seconds increment duration by 3sec
    if (parseInt(log.idleTime) < 120) {
      processes[processKey].duration += 3;
      processes[processKey].endTime = moment();
    }
  }
  writetofile(processes);
};
