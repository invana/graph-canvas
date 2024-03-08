
import { INode } from '../../canvas/types';
import CanvasCtrlBase from './base';
import type { CanvasShape } from './types';
import * as PIXI from "pixi.js";


export default class CanvasCtrl extends CanvasCtrlBase {
    // for drawing shapes



    // for debug
    // drawDebugBorder(point: PIXI.Point, width: number, height: number) {
    //     console.log("drawDebugBorder triggered", point, width, height)
    //     this.debugBorderGfx.clear();
        
    //     // Create a text label
    //     const label = new PIXI.Text('This is a line!', { fontFamily: 'Arial', fontSize: 16, fill: 0x000000 });
    //     label.x = (startX + endX) / 2;
    //     label.y = (startY + endY) / 2;
    //     label.anchor.set(0.5); // Center the anchor point


    //     this.debugBorderGfx.lineStyle(2, 0x1ab3eb).drawRect(point.x, point.y, width, height)
    //     //this.camera.worldWidth, this.camera.worldHeight);
    //     // line.drawRect(0,0, 120, 20)
    //     // line.te
    // }

    drawScreenBorder() {
        console.log("drawScreenBorder triggered")
        const { center, min, max, graphHeight, graphWidth } = this.getCenter(this.dataCtrl.nodes)
        // this.drawDebugBorder(center, graphWidth, graphHeight)

        const label = new PIXI.Text('screen border!', { fontFamily: 'Courier New', fontSize: 12, fill: 0x1ab3eb });
        // label.x = (min.x + max.x) / 2;
        // label.y = (min.x + max.y) / 2;
        label.x = min.x;
        label.y = min.y - 10;
        label.anchor.set(0.5); // Center the anchor point
        this.debugBorderGfx.addChild(label)

        this.debugBorderGfx.lineStyle(2, 0x1ab3eb).drawRect(center.x - graphWidth/2, center.y - graphHeight/2,
             graphWidth, graphHeight)

    }

    setDebug = (debug_mode: boolean) => { this.debug_mode = debug_mode; }
    debugOn = () => { this.debug_mode = true; }
    debugOff = () => { this.debug_mode = false; }


    addShape(shape: CanvasShape) {
        // this will add the shape to the canvas
        this.camera.addChild(shape);
    }

    zoomIn = () => {
        this.camera.zoom(-this.camera.screenWidth / 10, true);
    };

    zoomOut = () => {
        this.camera.zoom(this.camera.screenWidth / 10, true);
    };

    zoomLevel = () => {

    }


    // think of the zoomTo as a camera action

    zoomTo = () => {

    }

    fitView(nodes?: INode[], zoomLevel?: number) {
        console.log("==fitView", nodes, zoomLevel);
        if (!nodes) {
            nodes = this.dataCtrl.nodes;
        }
        const { center, } = this.getCenter(nodes)
        this.camera.moveCenter(center)
        // this.moveNodesToWorldCenter(nodes);
        // this.camera.setZoom(1, true);
        if (this.debug_mode) {
            this.drawScreenBorder()
        }
    }

    getNodesPOV(nodes: INode[]) {
        // // Zooms out so all or selected nodes fit on the canvas.  
        const nodesX = nodes.map((node: INode) => node.x);
        const nodesY = nodes.map((node: INode) => node.y);

        // @ts-ignore
        const minX = Math.min(...nodesX);
        // @ts-ignore
        const maxX = Math.max(...nodesX);
        // @ts-ignore
        const minY = Math.min(...nodesY);
        // @ts-ignore
        const maxY = Math.max(...nodesY);
        const min = new PIXI.Point(minX, minY);
        const max = new PIXI.Point(maxX, maxY)
        return { min, max }
    }

    getCenter(nodes: INode[]) {

        const { min, max } = this.getNodesPOV(nodes)
        const padding = 50;

        const graphWidth = Math.abs(max.x - min.x) + (padding * 2);
        const graphHeight = Math.abs(max.y - min.y) + (padding * 2);

        // draw a debug box
        const center = new PIXI.Point(
            min.x + graphWidth / 2,
            min.y + graphHeight / 2
        );
        // const start = min;
        return { center, max, min, graphWidth, graphHeight }

    }

    moveNodesToWorldCenter(nodes: INode[]) {
        // const {worldWidth, worldHeight} = this.camera;

        const nodesX = nodes.map((node) => node.x);
        const nodesY = nodes.map((node) => node.y);
        const minX = Math.min(...nodesX);
        const maxX = Math.max(...nodesX);
        const minY = Math.min(...nodesY);
        const maxY = Math.max(...nodesY);

        const graphWidth = Math.abs(maxX - minX);
        const graphHeight = Math.abs(maxY - minY);
        const graphCenter = new PIXI.Point(
            minX + graphWidth / 2,
            minY + graphHeight / 2
        );

        const padding = 50;
        const worldWidth = graphWidth + padding * this.worldScale;
        const worldHeight = graphHeight + padding * this.worldScale;

        this.camera.resize(worldWidth, worldHeight,
            this.camera.worldWidth, this.camera.worldHeight,
        );

        this.camera.center = graphCenter;
        this.camera.fit(true);
    }



    focusNode(node: INode, zoomLevel?: number) {
        // focus on the Node
        this.moveToPosition(node.x, node.y)
    }

    getViewPosition() {

    }

    moveToPosition(x: number, y: number) {
        // pass
    }
}