declare let defaultEvents: {
    click: (params?: any) => void;
    doubleClick: (params?: any) => void;
    oncontext: (params?: any) => void;
    dragStart: (params?: any) => void;
    dragging: (params?: any) => void;
    dragEnd: (params?: any) => void;
    controlNodeDragging: (params?: any) => void;
    controlNodeDragEnd: (params?: any) => void;
    zoom: (params?: any) => void;
    showPopup: (params?: any) => void;
    hidePopup: () => void;
    select: (params?: any) => void;
    selectNode: (params?: any) => void;
    selectEdge: (params?: any) => void;
    deselectNode: (params?: any) => void;
    deselectEdge: (params?: any) => void;
    hoverNode: (params?: any) => void;
    hoverEdge: (params?: any) => void;
    blurNode: (params?: any) => void;
    blurEdge: (params?: any) => void;
};
export default defaultEvents;