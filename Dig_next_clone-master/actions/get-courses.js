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
exports.getCourses = void 0;
const get_progress_1 = require("@/actions/get-progress");
const db_1 = require("@/lib/db");
const getCourses = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, title, categoryId, }) {
    try {
        const courses = yield db_1.db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
                chapters: {
                    some: {
                        isPublished: true,
                        lessons: {
                            some: {
                                isPublished: true,
                            },
                        },
                    },
                },
            },
            include: {
                exams: {
                    select: {
                        beforeScore: true,
                    },
                    take: 1,
                },
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const progressPromises = courses.map((course) => (0, get_progress_1.getProgress)(userId, course.id));
        const progressResults = yield Promise.all(progressPromises);
        const coursesWithProgress = courses.map((course, index) => {
            var _a;
            let courseProgressPercentage = progressResults[index];
            if (((_a = course.exams[0]) === null || _a === void 0 ? void 0 : _a.beforeScore) &&
                course.exams[0].beforeScore >= 50 &&
                courseProgressPercentage < 100) {
                courseProgressPercentage = Math.min(courseProgressPercentage, 100);
            }
            return Object.assign(Object.assign({}, course), { progress: courseProgressPercentage });
        });
        return coursesWithProgress;
    }
    catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
});
exports.getCourses = getCourses;
