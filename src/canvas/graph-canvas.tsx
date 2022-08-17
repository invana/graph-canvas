import React from "react";
import Graphin, {Behaviors, Components} from "@antv/graphin";
import {Grid} from "@antv/graphin-components";
import {Toolbar} from '@antv/graphin-components';

import {toolBarOptions} from "../plugins/toolbar";
import "@antv/graphin-icons/dist/index.css";
import {NodeContextMenu} from "../plugins/contextMenu";
import {defaultLayoutSettings, miniMapOptions} from "./settings";
import {defaultNodeStyle} from "./settings";
import PropTypes from 'prop-types';
import "./style.css";
import {GraphinContextType} from "@antv/graphin/lib/GraphinContext";
import {layoutsOptions} from "./layouts";

const {
    DragCanvas, // Drag the canvas
    ZoomCanvas, //Zoom canvas
    ClickSelect, // Click to select the node
    BrushSelect, //Circle selection operation
    DragNode, // Drag node
    // ResizeCanvas, // automatically adjust canvas width and height
    LassoSelect, // Lasso operation
    DragCombo, // Drag Combo
    ActivateRelations, // associated highlight
    Hoverable // Hover operation,
    // DragNodeWithForce
} = Behaviors;

const {MiniMap} = Components;
const {ContextMenu} = Components;


// @ts-ignore
function GraphCanvasComponent({data, containerId, width, height}) {
    console.log(data);


    const [state, setState] = React.useState({
        type: 'dagre',
        options: {},
    });

    // const historyRef = React.createRef();
    //
    // const handleTodo = () => {
    //     // @ts-ignore
    //     historyRef.current.todo();
    // };
    // const handleUndo = () => {
    //     // @ts-ignore
    //     historyRef.current.undo();
    // };

    const handleLayoutChange = (value: any) => {
        console.log('value', value);
        setState(value);
    };
    const {type, options} = state;

    const handleToolBarClick = (graphinContext: GraphinContextType, config: any) => {
        const {apis, graph} = graphinContext;
        const {handleZoomIn, handleZoomOut} = apis;
        const keyCode = config.key;
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
            handleLayoutChange(layoutData)
        } else if (keyCode === "screenshot") {
            graph.downloadImage()
        } else if (keyCode === "fit-center") {
            graph.fitView()
        } else if (keyCode === "canvas-clear") {
            graph.clear()
        } else if (keyCode === "canvas-redraw") {
            const autoPaint = graph.get('autoPaint');
            graph.setAutoPaint(false);
            graph.paint();
            graph.setAutoPaint(autoPaint);

        }

    };
    return (
        <div className="grid-plugin-container graph-canvas-container" style={{width: width, height: height}}>
            <Graphin
                data={data}
                className={"graph-canvas"}
                autoPaint={true}
                layout={{type, ...options}}
                containerId={containerId}
                defaultNodeStyle={defaultNodeStyle}
            >
                <Grid/>
                <MiniMap options={miniMapOptions}/>
                <ZoomCanvas enableOptimize/>
                {/* Drag and Drop Canvas */}
                <DragCanvas/>
                {/* Zoom Canvas */}
                <ZoomCanvas/>
                {/* Drag-and-drop node */}
                <DragNode/>
                {/* Click Node */}
                <DragCombo/>
                {/* Click Node */}
                <ClickSelect/>
                {/* Circle Node */}
                <BrushSelect/>
                <ActivateRelations/>
                {/*<UndoRedo ref={historyRef}/>*/}

                {/* <ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} /> */}
                {/* <TreeCollapse /> */}

                <ContextMenu style={{background: "#fff"}} bindType="node">
                    {(value) => {
                        return <NodeContextMenu {...value} />;
                    }}
                </ContextMenu>

                <LassoSelect/>
                <Hoverable bindType="edge"/>
                <Hoverable bindType="node"/>

                <Toolbar
                    options={toolBarOptions}
                    onChange={handleToolBarClick}
                    direction={"horizontal"}
                    style={{
                        position: "absolute",
                        top: -15,
                        width: "100%",
                        left: -1,
                        boxShadow: "none",

                    }}
                />
                {/* <DragNodeWithForce /> */}

            </Graphin>
        </div>
    );
}


GraphCanvasComponent.propTypes = {
    data: PropTypes.any,
    containerId: PropTypes.string,
    style: PropTypes.object,
}

export default GraphCanvasComponent;