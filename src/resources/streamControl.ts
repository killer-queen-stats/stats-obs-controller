import * as OBS from "../models/Obs";
import * as _ from "lodash";

export type StreamControlType {
    action: "start" | "stop";
    statsHost: string;
    statsPort?: number;
    statsPath: string;
}

export async function POST(body: StreamControlType) {
    const { action, statsHost, statsPort, statsPath } = body;

    const statsEndpoint: OBS.StatsEndpointType = _.omitBy({
        host: statsHost,
        port: statsPort,
        path: statsPath;
    }, _.isNil);

    let actionFn;
    if (action === "start") {
        actionFn = OBS.startStream;
    } else if (action === "stop") {
        actionFn = OBS.stopStream;
    }

    if (!actionFn) {
        return;
    }

    await actionFn(statsEndpoint);

    return;
}
