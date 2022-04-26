import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getActiveWindow } from "../ipc";
import { DETECT_INTERVAL, UPLOAD_INTERVAL } from "../utils/contants";

let detectIntervalID;
let uploadIntervalID;
export default function HighlightsProvider({ children }) {
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
        // console.log("Uploading...")
      }, UPLOAD_INTERVAL);
    }
    // *******************************************
  }, [uploading]);

  return children;
}
