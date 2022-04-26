import moment from "moment";
import { MINIMUM_LOG_DURATION } from "utils/contants";
import { readLogs, writetofile } from "../fileIO";
import { hashGenerator } from "./hashGenerator";

export const updateLogFile = (log) => {
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

export const processLogs = ({ logs, newLogs }) => {
  let logsToUpload = null;
  const newLogsArray = Object.values(newLogs);

  // ********** remove logs with duration less than minimum limit **********
  // const newLogsFiltered = newLogsArray.filter(
  //   (log) => log.duration >= MINIMUM_LOG_DURATION
  // );

  // ********** logs that didn't already exist in DB **********
  logsToUpload = newLogsArray.filter((log) => !logs?.[log.key]);
  console.log(logsToUpload.length)

  // ********** update existing logs **********
  const existingLogs = newLogsArray.filter((log) => logs?.[log.key]);
  const updatedExisitingLogs = existingLogs.map((log) => ({
    ...log,
    duration: log.duration + newLogs[log.key].duration,
  }));

  // ********** combine new logs and updated exisiting logs **********
  logsToUpload = [...logsToUpload, ...updatedExisitingLogs];
  logsToUpload = logsToUpload.reduce(
    (all, currentLog) => ({ ...all, [currentLog.key]: currentLog }),
    {}
  );

  return logsToUpload;
};
