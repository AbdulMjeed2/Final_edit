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
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
const pusher_1 = require("@/lib/pusher");
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            const { messageId, context } = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const reply = yield db_1.db.reply.create({
                data: {
                    messageId: messageId,
                    userId: userId,
                    context: context,
                }
            });
            console.log(reply);
            const currentMessage = yield db_1.db.message.findUnique({
                where: {
                    id: messageId
                }
            });
            const message = yield db_1.db.message.update({
                where: {
                    id: messageId
                },
                data: {
                    repliesCount: (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.repliesCount) + 1
                }
            });
            const user = yield server_1.clerkClient.users.getUser(userId);
            let tempMsg = { msg: reply, user: user };
            yield pusher_1.pusherServer.trigger("chat-event", "update-reply", {
                tempMsg
            });
            return server_2.NextResponse.json(message);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
// export async function GET(req: Request) {
//   try {
//     const { userId } = auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     let messagesWithUser: { msg: { id: string; userId: string | null; context: string; messageId: string | null; createdAt: Date; updatedAt: Date }; user: { firstName: string | null; lastName: string | null } }[] = []
//     const messages = await db.message.findMany({
//       orderBy: {
//           createdAt: 'desc'
//       }
//   })
//   await Promise.all(
//       messages.map(async (msg:any) => {
//           if (msg.userId != "nil") {
//               const response = await clerkClient.users.getUser(msg.userId)
//               let tempMsg = { msg, user: response }
//               messagesWithUser.push(tempMsg)
//           }
//       })
//   )
//   const sortedMessages = messagesWithUser.sort((a:any,b:any)=> b.msg.createdAt-a.msg.createdAt);
//     return NextResponse.json(sortedMessages);
//   } catch (error) {
//     console.log("[COURSES]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
