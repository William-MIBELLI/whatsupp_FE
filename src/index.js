import * as process from 'process';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import * as p from 'process'

window.global = window
window.process = p
window.Buffer = []

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    //<React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
    //</React.StrictMode>
);

reportWebVitals();
