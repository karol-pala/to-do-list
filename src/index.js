import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import { AppContainer } from "./Components/App";
import "./stylesheet.css";

import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>,
     document.getElementById("root")
);