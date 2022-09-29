import React, {useContext} from "react";
import {GraphinContext} from "@antv/graphin";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {layoutsOptions} from "../../layouts";

// const handleLayoutChange = (value: any) => {
//     console.log('value', value);
//     setState(value);
// };
export const handleCanvasNavClick = (  keyCode: string, stateManager: any, apis:any, graph:any) => {
 
    const {handleZoomIn, handleZoomOut} = apis;
    if (keyCode === "zoomIn") {
        handleZoomOut(); // for some weird reason, this is correct
    } else if (keyCode === "zoomOut") {
        handleZoomIn(); // for some weird reason, this is correct
    } else if (keyCode === "add-data") {
        graph.addItem("node", {
            id: "node2",
            label: "node2",
            x: 300,
            y: 150
        });
        graph.layout()
    } else if (keyCode.endsWith("-layout")) {
        const layoutData = layoutsOptions.find(item => item.type === keyCode.replace("-layout", ""));
        stateManager.setLayoutSettings(layoutData)
    } else if (keyCode === "screenshot") {
        console.log("Screenshow ");
        if (stateManager.rightModal === "showExportCanvas") {
            stateManager.setRightModal(null)
        } else {
            stateManager.setRightModal("showExportCanvas")
        }
    } else if (keyCode === "fit-center") {
        graph.fitView()
    } else if (keyCode === "canvas-clear") {
        graph.clear()
    } else if (keyCode === "canvas-redraw") {
        const autoPaint = graph.get('autoPaint');
        graph.setAutoPaint(false);
        graph.render();
        graph.paint();
        graph.setAutoPaint(autoPaint);
        graph.fitCenter()

    } else if (keyCode === "display-settings") {
        if (stateManager.rightModal === "showDisplaySettings") {
            stateManager.setRightModal(null)
        } else {
            stateManager.setRightModal("showDisplaySettings")
        }
    } else if (keyCode === "find-and-focus") {
        if (stateManager.rightModal === "showFindAndFocus") {
            stateManager.setRightModal(null)
        } else {
            stateManager.setRightModal("showFindAndFocus")
        }
    }

};

