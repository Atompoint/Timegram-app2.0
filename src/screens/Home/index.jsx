import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Menu, Dropdown, message, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { clearUser, startUploading, stopUploading } from "redux/userSlice";
import { Logo } from "components/logo";
import styles from "./Home.module.css";
import { SimpleButton, SwitchButton, LinkButton } from "components/Buttons";
import { openExternal } from "ipc";
// import { timeToMidnight } from "../../utils/Functions/helpers";
// import { user } from "../../services/user";
import { HIGHLIGHTS_LINK } from "utils/contants";
// import { emptyFile } from "../../utils/Functions/className";
// import { uploadLogs } from "../../utils/Functions/uploader";
import DownArrow from "assets/icons/down-arrow.svg";
import { signOut } from "api/firebase/user";
import packageJson from "../../../package.json";
import { getNewestVersionOfApp } from "api/firebase/app";
import { checkAppVersion } from "utils/helpers";
import { uploadLogs } from "api/firebase/highlights";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const [newAppUpdate, setNewAppUpdate] = useState(null);

  useEffect(() => {
    getNewestVersionOfApp().then((resp) => {
      if (resp && checkAppVersion(resp.currentVersion, packageJson.version))
        setNewAppUpdate(resp);
    });
  }, []);

  const logout = () => {
    navigate("/");
    dispatch(clearUser());
    signOut();
  };

  const handleButton = (checked) => {
    if (checked) {
      dispatch(startUploading());
    } else {
      dispatch(stopUploading());
      uploadLogs({ dispatch }).catch((error) => {
        notification.error({ message: error.message });
      });
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/***********  top row (logo, menu & upload details) ***********/}
        <Row>
          <Col flex={1} md={18}>
            <div className={styles.logoContainer}>
              <Logo />
              <span className={styles.version}>{packageJson.version}</span>
            </div>
            <div className={styles.detailsContainer}>
              <p className={styles.paragraph}>
                All data is private. Only you can see it.
              </p>
              <p className={styles.paragraph}>
                Last Uploaded: {user.uploadTime || "None in current session"}
              </p>
            </div>
          </Col>
          <Col flex={1} md={6} className={styles.menuContainer}>
            <LinkButton
              className={styles.logoutBtn}
              text="Logout"
              type="secondary"
              onClick={() => openExternal(HIGHLIGHTS_LINK)}
            />
            {/* for future use */}
            {/* <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="logout" onClick={logout}>
                    Logout
                  </Menu.Item>
                  <Menu.Item
                    key="appVersion"
                    disabled
                    className={styles.appVersion}
                  >
                    version: {packageJson.version}
                  </Menu.Item>
                </Menu>
              }
            >
              <img
                src={DownArrow}
                className={styles.downArrow}
                alt="down-icon"
              />
            </Dropdown> */}
          </Col>
        </Row>
        {/**************************************************************/}

        <div className={styles.divider} />

        {/*********** status & highlights button ***********/}
        <Row>
          <div className={styles.statusHeadingContainer}>
            <h1 className={styles.statusHeading}>
              Timegram
              <span className={styles.statusText}>
                {user.uploading ? "Running" : "Paused"}
              </span>
              {user.uploading && (
                <span className={styles.loadingContainer}>
                  <div className="dot-collision" />
                </span>
              )}
            </h1>
          </div>
        </Row>
        <Row>
          <Col>
            <SimpleButton
              text="View My Highlights"
              onClick={() => openExternal(HIGHLIGHTS_LINK)}
            />
          </Col>
        </Row>
        {/**************************************************/}
      </div>

      {/*********** footer ***********/}
      <footer className={styles.footer}>
        {/* for future use */}
        {/* {newAppUpdate && (
          <div className={styles.footerUpdateMsgContainer}>
            <span className={styles.footerMsgTxt}>
              New version {newAppUpdate?.currentVersion} available{" "}
            </span>
            <Button
              onClick={() =>
                newAppUpdate?.link && openExternal(newAppUpdate?.link)
              }
              size="small"
              className={styles.updateButton}
              type="text"
            >
              Update Now!
            </Button>
          </div>
        )} */}
        <div>
          <h3>{user?.firestore?.email}</h3>
          <SwitchButton checked={user.uploading} onChange={handleButton} />
        </div>
      </footer>
      {/******************************/}
    </>
  );
};

export default HomeScreen;
