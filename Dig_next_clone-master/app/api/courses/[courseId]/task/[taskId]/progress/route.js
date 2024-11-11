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
exports.PATCH = PATCH;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const { isCompleted } = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const taskProgress = yield db_1.db.userProgress.findFirst({
                where: {
                    userId,
                    lessonId: params.taskId
                }
            });
            if (taskProgress) {
                yield db_1.db.userProgress.update({
                    where: {
                        id: taskProgress.id
                    },
                    data: {
                        isCompleted: isCompleted
                    }
                });
            }
            else {
                yield db_1.db.userProgress.create({
                    data: {
                        lessonId: params.taskId,
                        userId,
                        isCompleted
                    }
                });
            }
            const publishedTask = yield db_1.db.task.update({
                where: {
                    id: params.taskId,
                },
                data: {
                    isPublished: true,
                },
            });
            return server_2.NextResponse.json(publishedTask);
        }
        catch (error) {
            console.log("[COURSE_ID_PUBLISH]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
