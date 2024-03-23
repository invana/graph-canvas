import * as PIXI from 'pixi.js';
import { BaseShape } from "../base";
import { INode, ILink } from "../../../../../graphCanvas/types";
import Canvas from '../../..';


class LinkShape extends BaseShape {

    private data: ILink
    color: string = "#666666"
    width: number = 3;

    constructor(canvas: Canvas) {
        super(canvas)
    }

    drawLabel() {
        const startX = this.data.source.x;
        const startY = this.data.source.y;
        const endX = this.data.target.x;
        const endY = this.data.target.y;
        // Add label text
        const text = new PIXI.Text(`link ${this.data.source.id}-${this.data.target.id}`, { fontFamily: 'Arial', fontSize: 12, fill: 0xFFFFFF });
        text.x = (startX + endX) / 2;
        text.y = (startY + endY) / 2;
        text.anchor.set(0.5);
        return text;
    }


    drawShape() {
        let shape = new PIXI.Graphics();
        
        // line color and thickness
        shape.lineStyle(this.width, 0xFFFFFF);

        console.log("link drawShape", this.data.source, this.data.target)
        const startX = this.data.source.x;
        const startY = this.data.source.y;
        const endX = this.data.target.x;
        const endY = this.data.target.y;

        // Draw the line
        shape.moveTo(startX, startY);
        shape.lineTo(endX, endY);


        // // Calculate arrowhead points
        const angle = Math.atan2(endY - startY, endX - startX);
        // const arrowWidth = 10; // width of the arrowhead
        const arrowLength = 10; // length of the arrowhead

        const x1 = endX - arrowLength * Math.cos(angle - Math.PI / 6);
        const y1 = endY - arrowLength * Math.sin(angle - Math.PI / 6);
        const x2 = endX - arrowLength * Math.cos(angle + Math.PI / 6);
        const y2 = endY - arrowLength * Math.sin(angle + Math.PI / 6);

        // Draw the arrowhead
        shape.moveTo(endX, endY);
        shape.lineTo(x1, y1);
        shape.moveTo(endX, endY);
        shape.lineTo(x2, y2);


        return shape
    }

    pointerOver(shapeGfx: PIXI.Graphics) {
        // showTooltip(node);
        shapeGfx.tint = 0x666666;
        // renderer.render(stage);
    }

    pointerOut(shapeGfx: PIXI.Graphics) {
        // hideTooltip();
        shapeGfx.tint = 0xFFFFFF;
        // renderer.render(stage);
    }
    draw(link: ILink) {
        this.data = link;

        this.container.cursor = 'pointer';

        // draw shape
        let shapeGfx = this.drawShape();
        this.container.addChild(shapeGfx);
        // draw label
        let labelGfx = this.drawLabel();
        this.container.addChild(labelGfx);
        // listeners for hover effect
        this.container.on("pointerover", () => this.pointerOver(shapeGfx));
        this.container.on("pointerout", () => this.pointerOut(shapeGfx));
        // listeners for dragging
        // on click
        // this.container.on('pointerdown', this.onDragStart.bind(this));
        // // this.container.on('mousedown', this.onDragStart.bind(this));
        // // on release 
        // // this.container.on('mouseup', this.graphCanvas.onDragEnd.bind(this));
        // this.container.on('pointerup', this.graphCanvas.onDragEnd.bind(this));
        // this.container.on('pointerupoutside', this.graphCanvas.onDragEnd.bind(this));
        // this.container.on('pointerout', this.graphCanvas.onDragEnd.bind(this));


        // this.container.on('pointerup', stopDrag);
        return this.container;
    }


}

export default LinkShape;