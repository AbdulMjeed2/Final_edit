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
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function DELETE(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const courseOwner = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId: userId
                }
            });
            if (!courseOwner) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const attachment = yield db_1.db.attachment.delete({
                where: {
                    courseId: params.courseId,
                    id: params.attachmentId,
                }
            });
            return server_2.NextResponse.json(attachment);
        }
        catch (error) {
            console.log("ATTACHMENT_ID", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
