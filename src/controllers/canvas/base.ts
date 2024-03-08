import { Application, Graphics } from 'pixi.js';
import { CanvasSetting } from './types';
import DataCtrl from '../data';
import Camera from './camera';
 

export interface CanvasOption  {
    screenWidth : number,
    screenHeight: number,
    worldWidth : number,
    worldHeight: number
}

export default class CanvasCtrlBase {
    // for drawing shapes

    protected app: Application;
    dataCtrl: DataCtrl;

    // camera
    camera: Camera;
    worldScale: number = 2;
 
    canvasOptions: CanvasOption;
    debug_mode : boolean;

    protected settings: CanvasSetting;
    // viewportSettings: CViewportSetting;
    debugBorderGfx = new Graphics();


    constructor(settings: CanvasSetting, dataCtrl: DataCtrl) {
        console.log("CanvasCtrlBase settings", settings)
        if (!settings.containerDiv) {
            throw ("containerDiv cannot be null")
        }
        this.debug_mode = false;
        this.dataCtrl = dataCtrl;
        this.settings = settings; // overall canvas settings 

        // @ts-ignore
        const divRectangle = this.settings.containerDiv?.getBoundingClientRect();
        if (divRectangle?.width === 0 || divRectangle?.height === 0 ){
            throw (`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        }

        this.canvasOptions = this.getDefaultOptions(divRectangle?.width, divRectangle?.height);
        this.app = this.createApp( this.canvasOptions.screenWidth, this.canvasOptions.screenHeight);
        this.camera = new Camera({  events: this.app.renderer.events, ...this.canvasOptions });
        this.camera.setUpCamera();
        this.camera.addChild(this.debugBorderGfx);

        this.app.stage.addChild(this.camera)
        this.app.start();
    }


    getDefaultOptions(screenWidth: number, screenHeight: number) {   
        return {
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            worldWidth: screenWidth * this.worldScale,
            worldHeight: screenHeight * this.worldScale,
        }
    }


    setDebug = (debug_mode: boolean) => {  this.debug_mode = debug_mode; }
    debugOn = () => { this.debug_mode = true; }
    debugOff = () => { this.debug_mode = false; }

    createApp( screenWidth: number, screenHeight: number ){
        const app = new Application({
            width: screenWidth,
            height: screenHeight,
            view: this.settings.containerDiv,
            antialias: true,
            resizeTo: window,
            autoStart: true, // // disable automatic rendering by ticker, render manually instead, only when needed
            autoDensity: false,
            resolution: window.devicePixelRatio, /// 2 for retina displays
            backgroundColor: this.settings.backgroundColor || 0x2a2c2e, // defaults to dark 
            eventMode : 'static' //  Emit events and is hit tested. Same as interaction = true in v7
        });
   
        // The stage will handle the move events
        app.stage.interactive = true;
        app.stage.hitArea = app.screen;
        // prevent body scrolling
        // @ts-ignore
        app.view.addEventListener('wheel', event => { event.preventDefault(); });
        return app;
    }

   
 
}