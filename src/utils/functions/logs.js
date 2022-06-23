import moment from "moment";
import { MINIMUM_LOG_DURATION } from "utils/contants";
import { readLogs, writetofile } from "../fileIO";
import { hashGenerator } from "./hashGenerator";

const exceptionList = ["electron", "SearchHost", "LockApp", "Timegram Setup 0"];

export const updateLogFile = (log) => {
  let processes = readLogs() || {};

  const processKey = `${hashGenerator(log.tabName)}-${log.pid}`;
  if (!processes[processKey]) {
    const object = {
      key: processKey,
      pid: log.pid,
      applicationName: log.applicationName,
      tabName: log.tabName,
      startTime: new Date(),
      endTime: new Date(),
      // mouse: log.mouse,                                            // future use
      duration: 0,
    };
    processes[processKey] = object;
  } else {
    // if idle time is less than 120 seconds increment duration by 3sec
    if (parseInt(log.idleTime) < 120) {
      processes[processKey].duration += 3;
      processes[processKey].endTime = new Date();
    }
  }

  writetofile(processes);
};

export const processLogs = ({ logs, newLogs }) => {
  let logsToUpload = null;
  // ********** convert new logs to array and convert their times to date objects **********
  let newLogsArray = Object.values(newLogs).map((log) => ({
    ...log,
    startTime: moment(log.startTime).toDate(),
    endTime: moment(log.endtime).toDate(),
  }));

  // ********** logs that didn't already exist in DB & log durantion > 0 **********
  logsToUpload = newLogsArray.filter(
    (log) => !logs?.[log.key] && log.duration > 0
  );

  // ********** exception list **********
  logsToUpload = logsToUpload.filter(
    (log) =>
      !exceptionList.find((item) => log.applicationName === item) &&
      log.applicationName !== "" &&
      log.tabName !== ""
  );

  // ********** update existing logs **********
  const existingLogs = Object.values(logs || {}).filter(
    (log) => newLogs?.[log.key]
  );

  const updatedExisitingLogs = existingLogs.map((log) => ({
    ...log,
    duration: log.duration + newLogs[log.key].duration,
    endTime: moment(newLogs[log.key].endTime).toDate(),
  }));

  // ********** combine new logs and updated exisiting logs **********
  logsToUpload = [...logsToUpload, ...updatedExisitingLogs];
  logsToUpload = logsToUpload.reduce(
    (all, currentLog) => ({ ...all, [currentLog.key]: currentLog }),
    {}
  );

  return logsToUpload;
};
