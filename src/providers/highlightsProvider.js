import { notification } from "antd";
import { uploadLogs } from "api/firebase/highlights";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forceUpdate, getActiveWindow } from "../ipc";
import { DETECT_INTERVAL, UPLOAD_INTERVAL } from "../utils/contants";

let detectIntervalID;
let uploadIntervalID;
export default function HighlightsProvider({ children }) {
  const dispatch = useDispatch();
  const { auth, firestore, uploading } = useSelector((state) => state.user);

  useEffect(() => {
    // ********** write in logs file **********
    if (detectIntervalID) {
      clearInterval(detectIntervalID);
    }
    if (uploading) {
      detectIntervalID = setInterval(() => {
        // console.log("Detected...")
        getActiveWindow();
      }, DETECT_INTERVAL);
    }
    // ****************************************

    // ********** upload from logs file **********
    if (uploadIntervalID) {
      clearInterval(uploadIntervalID);
    }
    if (uploading) {
      uploadIntervalID = setInterval(() => {
        uploadLogs({ dispatch }).catch((error) => {
          notification.error({ message: error.message });
        });
      }, UPLOAD_INTERVAL);
    }
    // *******************************************

    // force update logs on app close
    forceUpdate({ uploading, upload: () => uploadLogs({ dispatch }) });
  }, [uploading]);

  return children;
}
