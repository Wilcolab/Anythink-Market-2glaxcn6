import "./custom.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import React from "react";
import { GlobalStyle, ThemeProvider } from "styled-components"
import { store } from "./store";
import theme from "./styles/theme"

import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <GlobalStyle background-color />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
