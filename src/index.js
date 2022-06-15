import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

import { store } from "redux/store";
import "./index.css";
import App from "./App";
import FirebaseProvider from "providers/firebase";
import HighlightsProvider from "providers/highlightsProvider";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <FirebaseProvider>
        <ConfigProvider>
          <HighlightsProvider>
            <App />
          </HighlightsProvider>
        </ConfigProvider>
      </FirebaseProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
