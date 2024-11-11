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
            const messageDeleted = yield db_1.db.reply.delete({
                where: {
                    id: params.replyId
                }
            });
            const currentMessage = yield db_1.db.message.findUnique({
                where: {
                    id: params.messageId
                }
            });
            const message = yield db_1.db.message.update({
                where: {
                    id: params.messageId
                },
                data: {
                    repliesCount: (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.repliesCount) - 1
                }
            });
            yield pusher_1.pusherServer.trigger("chat-event", "delete-reply", {
                messageId: params.replyId
            });
            return server_2.NextResponse.json(messageDeleted);
        }
        catch (e) {
            console.log(e);
        }
    });
}
