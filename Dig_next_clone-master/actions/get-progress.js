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
exports.getProgress = void 0;
const db_1 = require("@/lib/db");
const getProgress = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publishedChapters = yield db_1.db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
                quiz: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        userId: true,
                    },
                },
                lessons: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });
        const publishedLessonIds = publishedChapters.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id));
        const exams = yield db_1.db.exam.findMany({
            where: {
                courseId,
                isPublished: true,
            },
        });
        const examsIds = exams.map((exam) => exam.id);
        const examsCompeleted = yield db_1.db.userProgress.count({
            where: {
                userId,
                lessonId: {
                    in: examsIds,
                },
            },
        });
        const publishedQuizIds = publishedChapters.filter((chapter) => { var _a; return ((_a = chapter.quiz) === null || _a === void 0 ? void 0 : _a.userId) != "nil" && chapter.quiz != null; });
        const validCompletedLessons = yield db_1.db.userProgress.count({
            where: {
                userId: userId,
                lessonId: {
                    in: publishedLessonIds,
                },
                isCompleted: true,
            },
        });
        const validCompletedQuizes = yield db_1.db.userQuizPoints.count({
            where: {
                userId: userId,
                AND: {
                    quiz: {
                        chapter: {
                            courseId: courseId,
                        },
                    },
                },
            },
        });
        const examsProgress = examsCompeleted * 10;
        const completedItems = validCompletedLessons + validCompletedQuizes;
        const totalItems = publishedLessonIds.length + publishedQuizIds.length;
        const progressPercentage = (completedItems / totalItems) * (100 - exams.length * 10) + examsProgress;
        return progressPercentage;
    }
    catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
});
exports.getProgress = getProgress;
