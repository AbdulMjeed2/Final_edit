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
exports.getMessages = getMessages;
const db_1 = require("@/lib/db");
const server_1 = require("@clerk/nextjs/server");
function getMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        let messagesWithUser = [];
        const messages = yield db_1.db.message.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        yield Promise.all(messages.map((msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg.userId != "nil") {
                const response = yield server_1.clerkClient.users.getUser(msg.userId);
                let tempMsg = { msg, user: { firstName: response.firstName, lastName: response.lastName } };
                messagesWithUser.push(tempMsg);
            }
        })));
        const sortedMessages = messagesWithUser.sort((a, b) => b.msg.createdAt - a.msg.createdAt);
        return sortedMessages;
    });
}
