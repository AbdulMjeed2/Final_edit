"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
const pusher_1 = require("@/lib/pusher");
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            const { context } = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const message = yield db_1.db.message.create({
                data: {
                    context: context,
                    userId
                }
            });
            const user = yield server_1.clerkClient.users.getUser(userId);
            let tempMsg = { msg: message, user: user };
            yield pusher_1.pusherServer.trigger("chat-event", "update-message", {
                tempMsg
            });
            console.log(tempMsg);
            return server_2.NextResponse.json(tempMsg);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            let messagesWithUser = [];
            const messages = yield db_1.db.message.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            yield Promise.all(messages.map((msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg.userId != "nil") {
                    try {
                        const response = yield server_1.clerkClient.users.getUser(msg.userId);
                        let tempMsg = { msg, user: response };
                        messagesWithUser.push(tempMsg);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            })));
            const sortedMessages = messagesWithUser.sort((a, b) => b.msg.createdAt - a.msg.createdAt);
            return server_2.NextResponse.json(sortedMessages);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
