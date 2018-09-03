import * as Koa from "koa";
import * as Router from "koa-router";
import * as StreamControl from "./resources/streamControl";

const bodyParser = require("koa-bodyparser");


const app = new Koa();
const router = new Router();
const PORT = 8088;

app.use(bodyParser());

router.get("/", async (ctx) => {
    ctx.body = "Hello World";
});

router.post("/stream/start", async (ctx, next) => {
    const { body } = ctx.request;
    const { statsHost, statsPort, statsPath } = body;

    const streamControlBody: StreamControl.StreamControlType = {
        action: "start",
        statsHost,
        statsPort,
        statsPath,
    };

    await StreamControl.POST(streamControlBody);
    return next();
});

router.post("/stream/stop", async (ctx, next) => {
    const { body } = ctx.request;
    const { statsHost, statsPort, statsPath } = body;

    const streamControlBody: StreamControl.StreamControlType = {
        action: "stop",
        statsHost,
        statsPort,
        statsPath,
    };

    await StreamControl.POST(streamControlBody);
    return next();
});

app.use(router.routes());

app.listen(PORT);

console.log(`App listening on port ${PORT}`)
