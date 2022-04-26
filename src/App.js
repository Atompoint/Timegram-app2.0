import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Login from "screens/Authentication/Login";
import HomeScreen from "screens/Home";
import { ConfigProvider } from "antd";

const COLORS = {
  primaryColor: "#1890ff",
  errorColor: "#ff4d4f",
  warningColor: "#faad14",
  successColor: "#52c41a",
  infoColor: "#1890ff",
};

function App() {
  useEffect(() => {
    ConfigProvider.config({
      theme: {
        ...COLORS,
        primaryColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue("--primaryColor"),
      },
    });
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
