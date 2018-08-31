import * as moment from "moment";

const OBSWebSocket = require("obs-websocket-js");
const rp = require("request-promise");

// Singleton
const obs = new OBSWebSocket();
obs.connect({ address: 'localhost:4444' })
    .then(() => {
        console.log("OBS connected on websocket")
    });


export type StatsEndpointType {
    host: string;
    port: number;
    path: string;
}

export async function startStream(statsEndpoint?: StatsEndpointType) {
    obs.on("StreamStarted", async () =>{
        await recordTS(statsEndpoint);
    });
    await obs.StartStreaming();
}

export async function stopStream(statsEndpoint?: StatsEndpointType) {
    obs.on("StreamStopped", async () =>{
        await recordTS(statsEndpoint);
    });
    await obs.StopStreaming();
}

async function recordTS(statsEndpoint? StatsEndpointType) {
    // Unix Time in millis
    const tsMs = moment().valueOf();
    if (statsEndpoint) {
        const { host, port, path } = statsEndpoint;
        const url = `http://${host}:${port}/path`

        await rp({
            method: "POST",
            uri: url,
            body: {
                ts: tsMs,
            },
            json: true,
        });
    }
    console.log(`Stream started at ${tsMs}`);
}
