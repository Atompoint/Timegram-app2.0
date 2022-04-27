import { refs, currentUser } from "./config";
import { emptyFile, readLogs } from "utils/fileIO";
import sizeof from "firestore-size"; // uninstall after user
import { reportError } from "./errors";
import { getDate } from "utils/dates";
import { processLogs } from "utils/functions/logs";

const fileSizeCheck = ({ logs, email }) => {
  const logSize = sizeof(logs);
  if (logSize > 999999) {
    reportError({
      code: "firestore doc file limit exceeded",
      details: {
        email: email,
        size: logSize,
        length: Object.keys(logs).length,
      },
    });
    throw new Error("Firebase doc file limit exceeded");
  }
};

export const uploadLogs = async () => {
  const logs = readLogs();
  if (logs && Object.values(logs).length > 0) {
    const user = currentUser();

    // ********** report & throw error if firestore doc size exceeded **********
    fileSizeCheck({ logs, email: user.email });

    // ********** filter logs **********

    // ********** get old logs **********
    const docRef = refs.currentDayHighlights(user.uid, getDate());
    const doc = await docRef.get();
    let data = null;
    if (doc.exists) {
      data = doc.data();
    }

    // ********** process logs **********
    const logsToUpload = processLogs({ logs: data, newLogs: logs });

    //  ********** upload **********
    let response;
    if (doc.exists) {
      response = await docRef.update(logsToUpload);
    } else {
      response = await docRef.set(logsToUpload);
    }

    // ********** clear logs **********
    emptyFile();

    return response;
  }
};
