/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import React from "react";
import CanvasArtBoard from "../graph/canvas-artboard";
import defaultOptions from "../graph/networkOptions";
// import {noImplementedAlert} from "../../utils";
import {GraphCanvasCtrl} from "../graph/canvas-ctrl";
import GenerateEvents from "../graph/events";
// import convertSchemaDataToVisJsData from "./utils";
// import sampleData from "./data.tsx";
import { json2GraphData, GraphData } from "./utils";
// import spaceXLaunchData from "../sample-data/spacex-launch-data.json"
import spaceXMissionsData from "../sample-data/spacex-missions-data.json"



const sampleData: GraphData = json2GraphData(spaceXMissionsData);

const SampleView = () => {
    // const [expand, setExpand] = React.useState(false);
    const canvasCtrl: GraphCanvasCtrl = new GraphCanvasCtrl();
    const [renderCanvas, setRenderCanvas] = React.useState<boolean>(false);
    const events = GenerateEvents(canvasCtrl, () => console.log("ok"), null)

    // const {loading, error, data} = useQuery(GET_SCHEMA_QUERY);
    // if (error) return <NetworkErrorUI error={error}/>;

    console.log("=====sampleData", sampleData)
    canvasCtrl.addNewData(sampleData.nodes.get(), sampleData.edges.get());


    // function getRndInteger(min: any, max: any) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // function addNewData() {
    //     const rand = getRndInteger(1, 1000);
    //     canvasCtrl.addNewData([{id: "yolo-" + rand, label: "yolo-" + rand}], []);
    // }

    return (
        <div className="show-fake-browser sidebar-page">


            {/*{loading ? (*/}
            {/*    <Loader backdrop content="Fetching schema model ..." vertical/>*/}
            {/*) : (<span></span>)}*/}
            <CanvasArtBoard
                containerId={"artboard-1"}
                renderCanvas={renderCanvas}
                setRenderCanvas={setRenderCanvas}
                options={defaultOptions}
                events={events}
                canvasCtrl={canvasCtrl}
            />

        </div>
    );
};

export default SampleView;