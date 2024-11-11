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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCH = PATCH;
exports.DELETE = DELETE;
exports.GET = GET;
const db_1 = require("@/lib/db");
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const _b = yield req.json(), { isPublished } = _b, values = __rest(_b, ["isPublished"]);
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const ownCourse = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId,
                },
            });
            if (!ownCourse) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const task = yield db_1.db.task.update({
                where: {
                    id: params.taskId,
                    courseId: params.courseId,
                },
                data: Object.assign({}, values),
            });
            return server_2.NextResponse.json(task);
        }
        catch (error) {
            console.log("[COURSES_CHAPTER_ID]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const task = yield db_1.db.task.findUnique({
                where: {
                    id: params.taskId,
                }
            });
            if (!task) {
                return new server_2.NextResponse("Not found", { status: 404 });
            }
            const deletedTask = yield db_1.db.task.delete({
                where: {
                    id: params.taskId,
                },
            });
            return server_2.NextResponse.json(deletedTask);
        }
        catch (error) {
            console.log("[COURSE_ID_DELETE]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
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
            const attachmentsWithUsers = [];
            const attachments = yield db_1.db.taskAttachment.findMany({ where: { taskId: params.taskId } });
            console.log(attachments);
            for (let i = 0; i < attachments.length; i++) {
                const attachment = attachments[i];
                if (attachment) {
                    let user = yield server_1.clerkClient.users.getUser(attachment.userId);
                    attachmentsWithUsers.push({ user, attachment });
                }
            }
            return server_2.NextResponse.json(attachmentsWithUsers);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
