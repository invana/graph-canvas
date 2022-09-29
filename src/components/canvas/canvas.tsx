import React from "react";
import Graphin, {Behaviors, Components} from "@antv/graphin";
import {Grid} from "@antv/graphin-components";
import "@antv/graphin-icons/dist/index.css";
import {NodeContextMenu} from "../../canvas/plugins/contextMenu/contextMenu";
import {defaultLayoutSettings, miniMapOptions} from "../../settings/default";
import {defaultNodeStyle} from "../../settings/default";
import "../../canvas/style.css";
import ShowSelectedNodes from "../../canvas/plugins/selectedNodes"
import Footer from "../../canvas/plugins/footer/footer";
import "./canvas.css"
import PropTypes from 'prop-types';
import StateManager from "../../state/manager";
import HoveredItemInfo from "../../canvas/plugins/hoveredItemInfo";
import "../normalise.css";
import {applyStylesToData} from "../../canvas/colorUtils";
import CanvasNav from "../../canvas/plugins/canvasNav/canvasNav";

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

const {MiniMap, ContextMenu, SnapLine} = Components;
// const {ContextMenu} = Components;
const options = {
    line: {
        stroke: 'lightgreen',
        lineWidth: 0.5,
    },
};
/*

{
    statusMessageText : null,
    data : {
        nodes: [],
        edges: [],
    },
    selectedNodes: [],
    hoveredItem: null,
    displaySettings: {
        canvas: {
            background: null,
            layout: {}
        },
        nodeSettings: {
        },
        edgeSettings: {
        }
    }
}
*/


// @ts-ignore
function GraphCanvas({data, containerId, width, height, initState, welcomeComponent}) {
    console.log(data);
    const [layoutSettings, setLayoutSettings] = React.useState(initState["layoutSettings"]);
    const [selectedNodes, setSelectedNodes] = React.useState(initState["selectedNodes"]);
    const [messageText, setMessageText] = React.useState(initState["messageText"]);
    const [hoveredItem, setHoveredItem] = React.useState(initState["hoveredItem"]);

    const [rightModal, setRightModal] = React.useState(null)

    // const [showDisplaySettings, setShowDisplaySettings] = React.useState(initState["showDisplaySettings"]);
    // const [showFindAndFocus, setShowFindAndFocus] = React.useState(initState["showFindAndFocus"]);
    // const [showExportCanvas, setExportCanvas] = React.useState(false);

    const [nodeDisplaySettings, setNodeDisplaySettings] = React.useState(initState["nodeDisplaySettings"]);
    const [edgeDisplaySettings, setEdgeDisplaySettings] = React.useState(initState["edgeDisplaySettings"]);


    const processedData = applyStylesToData(data,
        initState["nodeDisplaySettings"],
        initState["edgeDisplaySettings"])

    const stateManager = new StateManager(
        setLayoutSettings,
        setSelectedNodes,
        setMessageText,
        setHoveredItem,
        // setShowDisplaySettings,
        setNodeDisplaySettings,
        setEdgeDisplaySettings,
        setRightModal,
        // setShowFindAndFocus,
        // setExportCanvas,
        layoutSettings,
        selectedNodes,
        messageText,
        hoveredItem,
        nodeDisplaySettings,
        edgeDisplaySettings,
        // showDisplaySettings,
        // showFindAndFocus,
        // showExportCanvas
        rightModal
    )


    // @ts-ignore
    return (
        <div className="grid-plugin-container graph-canvas-container"
             style={{
                 width: width, height: height,
                 paddingTop: "30px"
             }}>
            <Graphin
                data={processedData}
                className={"graph-canvas"}
                autoPaint={true}
                // height={height - 38}
                layout={{type: layoutSettings.type, ...layoutSettings.options}}
                containerId={containerId}
                defaultNodeStyle={defaultNodeStyle}
            >

                <SnapLine options={options} visible/>

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
                {/*<FocusSelectedNodes/>*/}
                {/*<SelectMultipleNodes />*/}

                {/*<ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />*/}
                {/* <TreeCollapse /> */}
                {/** hovering node**/}
                <CanvasNav     stateManager={stateManager} />
                <ShowSelectedNodes
                    selectedNodes={selectedNodes}
                    stateManager={stateManager}
                    style={{
                        "top": "10px",
                        "left": "15px",
                        "position": "absolute"
                    }}/>
                <HoveredItemInfo stateManager={stateManager}/>
                <ContextMenu style={{
                    background: "#fff",
                    maxHeight: "600px",
                    width: "320px"
                }} bindType="node">
                    {(value) => {
                        return <NodeContextMenu {...value} />;
                    }}
                </ContextMenu>

                <LassoSelect/>
                <Hoverable bindType="edge"/>
                <Hoverable bindType="node"/>

                {
                    welcomeComponent
                        ? welcomeComponent : <span/>
                }
                {/*{*/}
                {/*    rightModal === "showDisplaySettings"*/}
                {/*        ? <DisplaySettings*/}
                {/*            nodeDisplaySettings={nodeDisplaySettings}*/}
                {/*            edgeDisplaySettings={edgeDisplaySettings}*/}
                {/*            stateManager={stateManager}*/}
                {/*        /> : rightModal === "showFindAndFocus"*/}
                {/*            ? <FindAndFocus stateManager={stateManager}/>*/}
                {/*            : rightModal === "showExportCanvas"*/}
                {/*                ? <ExportCanvas stateManager={stateManager}/> : <span/>*/}
                {/*}*/}
                {/*<Toolbar*/}
                {/*    style={{"top": "-31px", "left": "-1px"}}*/}
                {/*    options={leftToolBarOptions}*/}
                {/*    onChange={(graphinContext: GraphinContextType, config: any) =>*/}
                {/*        handleToolBarClick(graphinContext, config, stateManager)}*/}
                {/*/>*/}

                {/*<Toolbar*/}
                {/*    style={{"top": "-31px", "right": "-1px"}}*/}
                {/*    options={rightToolBarOptions}*/}
                {/*    onChange={(graphinContext: GraphinContextType, config: any) =>*/}
                {/*        handleToolBarClick(graphinContext, config, stateManager)}*/}
                {/*/>*/}

                {/* <DragNodeWithForce /> */}
                <Footer messageText={messageText} selectedNodes={selectedNodes}/>

            </Graphin>
        </div>
    );
}


GraphCanvas.propTypes = {
    data: PropTypes.any,
    containerId: PropTypes.string,
    style: PropTypes.object,
    initState: PropTypes.object,
    welcomeComponent: PropTypes.any,
}

export default GraphCanvas;