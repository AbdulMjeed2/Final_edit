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
            const course = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId,
                },
                include: {
                    chapters: {
                        include: {
                            lessons: true,
                        },
                    },
                },
            });
            if (!course) {
                return new server_2.NextResponse("Not found", { status: 404 });
            }
            const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
            if (!course.title ||
                !course.imageUrl ||
                !course.categoryId ||
                !hasPublishedChapter) {
                return new server_2.NextResponse("Missing required fields", { status: 401 });
            }
            const publishedCourse = yield db_1.db.course.update({
                where: {
                    id: params.courseId,
                    userId,
                },
                data: {
                    isPublished: true,
                },
            });
            return server_2.NextResponse.json(publishedCourse);
        }
        catch (error) {
            console.log("[COURSE_ID_PUBLISH]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
