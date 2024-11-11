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
            const chapter = yield db_1.db.chapter.findUnique({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId,
                },
                include: {
                    lessons: true,
                    quiz: {
                        where: {
                            isPublished: true,
                        },
                        include: {
                            userQuizPoints: true,
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
            if (!chapter) {
                return new server_2.NextResponse("Not found", { status: 404 });
            }
            return server_2.NextResponse.json(chapter);
        }
        catch (error) {
            console.log("[CHAPTER_ID_GET]", error);
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
            const ownCourse = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId,
                },
            });
            if (!ownCourse) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const chapter = yield db_1.db.chapter.findUnique({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId,
                },
            });
            if (!chapter) {
                return new server_2.NextResponse("Not Found", { status: 404 });
            }
            const deletedChapter = yield db_1.db.chapter.delete({
                where: {
                    id: params.chapterId,
                },
            });
            const publishedChaptersInCourse = yield db_1.db.chapter.findMany({
                where: {
                    courseId: params.courseId,
                    isPublished: true,
                },
            });
            if (!publishedChaptersInCourse.length) {
                yield db_1.db.course.update({
                    where: {
                        id: params.courseId,
                    },
                    data: {
                        isPublished: false,
                    },
                });
            }
            return server_2.NextResponse.json(deletedChapter);
        }
        catch (error) {
            console.log("[CHAPTER_ID_DELETE]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
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
            const chapter = yield db_1.db.chapter.update({
                where: {
                    id: params.chapterId,
                    courseId: params.courseId,
                },
                data: Object.assign({}, values),
            });
            return server_2.NextResponse.json(chapter);
        }
        catch (error) {
            console.log("[COURSES_CHAPTER_ID]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
