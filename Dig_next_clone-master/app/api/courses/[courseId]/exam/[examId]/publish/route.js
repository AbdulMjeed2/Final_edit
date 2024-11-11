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
            const exam = yield db_1.db.exam.findUnique({
                where: {
                    id: params.examId,
                    courseId: params.courseId,
                },
            });
            if (!exam || !exam.title || !exam.description) {
                return new server_2.NextResponse("Missing required fields", { status: 400 });
            }
            const publishedExam = yield db_1.db.exam.update({
                where: {
                    id: params.examId,
                    courseId: params.courseId,
                },
                data: {
                    isPublished: true,
                },
            });
            return server_2.NextResponse.json(publishedExam);
        }
        catch (error) {
            console.log("[CHAPTER_PUBLISH]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
