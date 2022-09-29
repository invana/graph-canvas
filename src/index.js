import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./views/index";
import TestView from "./views/TestView";
// import App from "./views";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
    <StrictMode>
        {/*<App/>*/}
        <TestView />
    </StrictMode>
);
