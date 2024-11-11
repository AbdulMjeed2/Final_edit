"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusherClient = exports.pusherServer = void 0;
const pusher_1 = __importDefault(require("pusher"));
const pusher_js_1 = __importDefault(require("pusher-js"));
console.log(process.env.NEXT_PUBLIC_PUSHER_APP_ID);
exports.pusherServer = new pusher_1.default({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    useTLS: true
});
exports.pusherClient = new pusher_js_1.default(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: "eu",
});
