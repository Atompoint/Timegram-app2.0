import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Spin, message } from "antd";
import { Logo } from "components/logo";
import styles from "./Login.module.css";
import { TextBox } from "components/Forms/TextBox";
import { CheckBox } from "components/Forms/CheckBox";
import { LinkButton, SimpleButton } from "components/Buttons";
import { signIn } from "api/firebase/user";
import { openExternal } from "../../ipc";
import { FORGOT_PASSWORD_LINK } from "utils/contants";
// import { emptyFile } from '../../utils/Functions/className'
import { startUserLoading, stopUserLoading, clearUser } from "redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (values) => {
    if (user.firestore || user.auth) {
      dispatch(clearUser());
    }
    setTimeout(() => {
      dispatch(startUserLoading());
      signIn(values).catch(() => {
        dispatch(stopUserLoading());
      });
    }, 0);
  };

  return (
    <Row>
      <Col flex={1} md={24} className={styles.wrapper}>
        <Logo />
        {user.loading ? (
          <div className={styles.spinContainer}>
            <Spin />
          </div>
        ) : (
          <>
            <h1 className={styles.heading}>
              Sign in <span>Now</span>
            </h1>
            {/* might need later */}
            {/* <p className="para">
                  {' '}
                  Don&apos;t have an account?
                  <span
                    onClick={() => redirect('sign-up')}
                    role="button"
                    tabIndex={0}
                  >
                    {' '}
                    Sign up
                  </span>
                </p> */}
            <Form
              layout="vertical"
              className={styles.form}
              requiredMark={false}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <TextBox
                validationKey="email"
                name="email"
                label="Work Email"
                placeholder="Please Enter Work Email"
                type="text"
              />
              <TextBox
                className={styles.textbox}
                validationKey="password"
                name="password"
                label="Password"
                placeholder="Enter 6 or more characters"
                type="password"
              />
              <div className={styles.buttonsContainer}>
                <CheckBox
                  name="isRemember"
                  text="Remember Me"
                  propName="checked"
                />

                <LinkButton
                  click={() => openExternal(FORGOT_PASSWORD_LINK)}
                  icon={false}
                  text="Forgot Password?"
                  className={styles.forgotPasswordButton}
                />
              </div>
              <SimpleButton
                type="primary"
                size="large"
                shape="round"
                text="Sign in"
                hType="submit"
              />
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Login;
