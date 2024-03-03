import { Application } from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import { CanvasSetting } from './types';
import { CViewportSetting } from './types';
import DataCtrl from '../data';


export default class CanvasCtrlBase {
    // for drawing shapes

    protected app: Application;
    dataCtrl: DataCtrl;
    viewport: Viewport;

    protected settings: CanvasSetting;
    viewportSettings: CViewportSetting;
 

    constructor(settings: CanvasSetting, dataCtrl: DataCtrl) {
        console.log("CanvasCtrlBase settings", settings)
        if (!settings.containerDiv) {
            throw ("containerDiv cannot be null")
        }
        
        this.dataCtrl = dataCtrl;
        this.settings = settings; // overall canvas settings 
        this.viewportSettings = this.getSettingsWithDefaults() // only viewport settings

        this.app = this.createApp();
        this.viewport = this.createViewPort()
        this.app.stage.addChild(this.viewport); // add viewport to stage        
        this.app.start();

    }

    getSettingsWithDefaults() {
        // @ts-ignore
        const divRectangle = this.settings.containerDiv?.getBoundingClientRect();
        if (divRectangle?.width === 0 || divRectangle?.height === 0 ){
            throw (`cannot draw canvas in a div with dimensions ${JSON.stringify(divRectangle)}`)
        }
        console.log("Found containerDiv with the dimensions", divRectangle)            
        return {
            screenWidth: divRectangle.width,
            screenHeight: divRectangle.height,
            worldWidth: divRectangle.width * 2,
            worldHeight: divRectangle.height * 2,
        }
    }

    createApp( ){
        const app = new Application({
            width: this.viewportSettings.screenWidth,
            height: this.viewportSettings.screenHeight,
            view: this.settings.containerDiv,
            antialias: true,
            resizeTo: window,
            autoStart: false, // // disable automatic rendering by ticker, render manually instead, only when needed
            autoDensity: false,
            resolution: window.devicePixelRatio, /// 2 for retina displays
            // backgroundColor: this.settings.backgroundColor || 0x2a2c2e, // defaults to dark 
            eventMode : 'static' //  Emit events and is hit tested. Same as interaction = true in v7
        });
   
        // The stage will handle the move events
        app.stage.interactive = true;
        app.stage.hitArea = app.screen;
        // prevent body scrolling
        // app.view.addEventListener('wheel', event => { event.preventDefault(); });

        return app;
    }

    createViewPort = () => {
        const screenHeight = this.app.view.height;
        const screenWidth = this.app.view.width;        

        const screenScale = 1;
        const worldWidth = screenWidth * screenScale;
        const worldHeight =  screenHeight * screenScale;

        const viewport = new Viewport({
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            worldWidth: worldWidth,
            worldHeight: worldHeight,
            events: this.app.renderer.events,
            // backgroundColor: this.settings.backgroundColor
        });
        viewport
            .drag().pinch({ percent: 2 }).wheel().decelerate()
            .clampZoom({ minWidth: screenWidth / 2, minHeight:  screenHeight / 2 });

        return viewport
    }
 
}