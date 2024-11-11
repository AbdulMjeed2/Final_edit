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
exports.DELETE = DELETE;
exports.GET = GET;
const db_1 = require("@/lib/db");
const pusher_1 = require("@/lib/pusher");
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const messageDeleted = yield db_1.db.message.delete({
                where: {
                    id: params.messageId
                }
            });
            yield pusher_1.pusherServer.trigger("chat-event", "delete-message", {
                messageId: params.messageId
            });
            return server_2.NextResponse.json(messageDeleted);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const replies = yield db_1.db.reply.findMany({ where: { messageId: params.messageId }, orderBy: { updatedAt: "desc" } });
            const message = yield db_1.db.message.findUnique({ where: { id: params.messageId } });
            let user = yield server_1.clerkClient.users.getUser(message === null || message === void 0 ? void 0 : message.userId);
            user = JSON.parse(JSON.stringify(user));
            const repliesWithUsers = [];
            for (let i = 0; i < replies.length; i++) {
                let reply = replies[i];
                console.log("LINE21" + reply.userId);
                if (reply.userId) {
                    const replyOwner = yield server_1.clerkClient.users.getUser(reply.userId);
                    const tempMessage = { msg: reply, user: replyOwner };
                    repliesWithUsers.push(tempMessage);
                    console.log(JSON.stringify(tempMessage));
                }
            }
            return server_2.NextResponse.json({ replies: repliesWithUsers, orgin: { user: user, message: message } });
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
