import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Menu, Dropdown, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { startUploading, stopUploading } from "redux/userSlice";
import { Logo } from "components/logo";
import styles from "./Home.module.css";
import { SimpleButton, SwitchButton } from "components/Buttons";
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
    signOut();
  };

  const handleButton = (checked) => {
    if (checked) {
      dispatch(startUploading());
    } else {
      dispatch(stopUploading());
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        {/***********  top row (logo, menu & upload details) ***********/}
        <Row>
          <Col flex={1} md={18}>
            <Logo />
            <div className={styles.detailsContainer}>
              <p className={styles.paragraph}>
                All data is private. Only you can see it.
              </p>
              <p className={styles.paragraph}>
                Last Uploaded:{" "}
                {moment(new Date()).format("dddd,  MMM DD gggg hh:mm:ss A")}
              </p>
            </div>
          </Col>
          <Col flex={1} md={6} className={styles.menuContainer}>
            <Dropdown
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
                    Version: {packageJson.version}
                  </Menu.Item>
                </Menu>
              }
            >
              <img
                src={DownArrow}
                className={styles.downArrow}
                alt="down-icon"
              />
            </Dropdown>
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
        {newAppUpdate && (
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
        )}
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
