import GraphCanvas from "../../canvas/graph";
import { INode, ILink, GraphCanvasSetting } from "../../canvas/types";





const nodes: Array<INode> = [
    {
        id : "1",
        label: "Ravi",
        type: "Person",
        shape: "circle",
        // x: 0, 
        // y: 0

    },
    {
        id : "2",
        label: "GraphCanvas",
        type: "Project",
        shape: "circle",
        // x: 0, 
        // y: 0

    },
    {
        id: "3",
        label: "TestNode",
        type: "Test",
        shape: "circle"
    }
];

const edges: Array<ILink> = [
    // {
    //     id: '1-2',
    //     source: '1',
    //     target: '2'
    // }
];

export const createPage = () => {

    const html = document.createElement("div");

    // create canvas
    const canvasDiv = document.createElement('canvas');
    canvasDiv.style.width = "100vw"
    canvasDiv.style.height = "100vh"
    // canvasDiv.style.border = "10px solid red"

    html.appendChild(canvasDiv)

    // create event list 
    const eventbar = document.createElement('div');
    eventbar.classList.add("eventbar");
    eventbar.style.top = "60px";
    eventbar.style.left = "10px";
    eventbar.style.maxHeight = "855px";
    eventbar.style.width = "300px";
    // eventbar.style.background = "red";
    eventbar.style.position = "absolute";
    eventbar.style.overflowY = "hidden"; 
    html.appendChild(eventbar);



    // create toolbar
    const toolbar = document.createElement('div');
    toolbar.classList.add("toolbar");
    toolbar.style.top = "10px";
    toolbar.style.left = "10px";
    toolbar.style.position = "absolute"

    const zoomInButton = document.createElement('button');
    zoomInButton.innerHTML = "zoom in";
    toolbar.appendChild(zoomInButton);
    
    const zoomOutButton = document.createElement('button');
    zoomOutButton.innerHTML = "zoom out";
    toolbar.appendChild(zoomOutButton);

    const fitViewButton = document.createElement('button');
    fitViewButton.innerHTML = "fitView"
    toolbar.appendChild(fitViewButton);

    html.appendChild(toolbar)


    const showEvent = (eventType: string)=> {
        // notify event 

        const eventDiv = document.createElement('div')
        eventDiv.innerHTML = `fired - ${eventType}`;
        eventDiv.style.borderBottom = "2px solid #999"
        eventDiv.style.padding = "10px "
        eventDiv.style.marginBottom = "5px"
        eventDiv.style.background = "#000"
        eventDiv.style.opacity = "0.5"
        eventDiv.style.width = "200px";
        eventDiv.style.color = "white"

        eventbar.prepend(eventDiv)

        setTimeout(function(){
            // auto delete the even notification 
            eventbar.removeChild(eventDiv);
        }, 3000);
        
    }


    document.addEventListener("DOMContentLoaded", function(event) {
        /* The stuff I needed to initialise */
        console.log("=DOM is ready", event)
        const canvasSettings: GraphCanvasSetting = {canvas: {containerDiv: canvasDiv, backgroundColor: 0x2a2c2e}};
        const graph = new GraphCanvas(canvasSettings);
        graph.addData(nodes, edges)

        zoomInButton.addEventListener('click', () => graph.canvasCtrl.zoomIn());
        zoomOutButton.addEventListener('click', () => graph.canvasCtrl.zoomOut());
        fitViewButton.addEventListener('click', () => graph.canvasCtrl.fitView());




        graph.canvasCtrl.viewport.on('clicked', () => showEvent('clicked'));
        graph.canvasCtrl.viewport.on('drag-start', () => showEvent('drag-start'));
        graph.canvasCtrl.viewport.on('drag-end', () => showEvent('drag-end'));
        graph.canvasCtrl.viewport.on('pinch-start', () => showEvent('pinch-start'));
        graph.canvasCtrl.viewport.on('pinch-end', () => showEvent('pinch-end'));
        graph.canvasCtrl.viewport.on('bounce-start-x', () => showEvent('bounce-start-x'));
        graph.canvasCtrl.viewport.on('bounce-end-x', () => showEvent('bounce-end-x'));
        graph.canvasCtrl.viewport.on('bounce-start-y', () => showEvent('bounce-start-y'));
        graph.canvasCtrl.viewport.on('bounce-end-y', () => showEvent('bounce-end-y'));
        graph.canvasCtrl.viewport.on('snap-start', () => showEvent('snap-start'));
        graph.canvasCtrl.viewport.on('snap-end', () => showEvent('snap-end'));
        graph.canvasCtrl.viewport.on('snap-zoom-start', () => showEvent('snap-zoom-start'));
        graph.canvasCtrl.viewport.on('snap-zoom-end', () => showEvent('snap-zoom-end'));
        graph.canvasCtrl.viewport.on('mouse-edges-start', () => showEvent('mouse-edges-start'));
        graph.canvasCtrl.viewport.on('mouse-edges-end', () => showEvent('mouse-edges-end'));
        graph.canvasCtrl.viewport.on('moved-end', () => showEvent('moved-end'));
        graph.canvasCtrl.viewport.on('zoomed-end', () => showEvent('zoomed-end'));
        graph.canvasCtrl.viewport.on("pointerover", () => showEvent('pointerover'));
        graph.canvasCtrl.viewport.on("pointerout", () => showEvent('pointerout'));


    }, false);

    // const section = `<section class="storybook-page"></section>`;
    // canvasDiv.insertAdjacentElement('beforeend', toolbar);
    return html;
};
