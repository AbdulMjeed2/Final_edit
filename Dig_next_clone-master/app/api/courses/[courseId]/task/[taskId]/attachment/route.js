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
function POST(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const { url } = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const attachment = yield db_1.db.taskAttachment.create({
                data: {
                    url,
                    taskId: params.taskId,
                    userId: userId,
                    name: url.split("/").pop(),
                }
            });
            const previousAttach = yield db_1.db.userProgress.findFirst({
                where: {
                    userId: userId,
                    lessonId: params.taskId,
                }
            });
            if (previousAttach) {
                if (previousAttach === null || previousAttach === void 0 ? void 0 : previousAttach.isCompleted) {
                }
                else {
                    const completedTask = yield db_1.db.userProgress.update({
                        where: {
                            id: previousAttach === null || previousAttach === void 0 ? void 0 : previousAttach.id
                        },
                        data: {
                            isCompleted: true,
                        }
                    });
                }
            }
            else {
                const completedTask = yield db_1.db.userProgress.create({
                    data: {
                        userId: userId,
                        lessonId: params.taskId,
                        isCompleted: true
                    }
                });
            }
            return server_2.NextResponse.json(attachment);
        }
        catch (error) {
            console.log("COURSE_ID_ATTACHMENTS", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
