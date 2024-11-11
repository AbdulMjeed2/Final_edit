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
exports.GET = GET;
exports.DELETE = DELETE;
exports.PATCH = PATCH;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const course = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                },
                include: {
                    chapters: true,
                    exams: {
                        where: {
                            isPublished: true,
                        },
                        include: {
                            certificate: true,
                            questions: {
                                where: {
                                    isPublished: true,
                                },
                                include: {
                                    options: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!course) {
                return new server_2.NextResponse("Course Not found", { status: 404 });
            }
            return server_2.NextResponse.json(course);
        }
        catch (error) {
            console.log("[COURSE_ID_GET]", error);
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
            const course = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId: userId,
                },
                include: {
                    chapters: true,
                },
            });
            if (!course) {
                return new server_2.NextResponse("Not found", { status: 404 });
            }
            const deletedCourse = yield db_1.db.course.delete({
                where: {
                    id: params.courseId,
                },
            });
            return server_2.NextResponse.json(deletedCourse);
        }
        catch (error) {
            console.log("[COURSE_ID_DELETE]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const { courseId } = params;
            const values = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const course = yield db_1.db.course.update({
                where: {
                    id: courseId,
                    userId,
                },
                data: Object.assign({}, values),
            });
            return server_2.NextResponse.json(course);
        }
        catch (error) {
            console.log("[COURSE_ID]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
