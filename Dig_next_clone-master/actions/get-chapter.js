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
exports.getChapter = void 0;
const db_1 = require("@/lib/db");
const getChapter = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, courseId, chapterId, lessonId, }) {
    try {
        const course = yield db_1.db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
            include: {
                chapters: {
                    where: {
                        id: chapterId,
                        isPublished: true
                    },
                    include: {
                        lessons: {
                            where: {
                                id: lessonId,
                                isPublished: true
                            }
                        }
                    }
                },
                attachments: {
                    where: {
                        courseId
                    }
                }
            }
        });
        console.log(course === null || course === void 0 ? void 0 : course.chapters);
        const chapter = course === null || course === void 0 ? void 0 : course.chapters[0];
        const lesson = chapter === null || chapter === void 0 ? void 0 : chapter.lessons[0];
        if (!chapter || !course || !lesson) {
            throw new Error("Chapter or course not found");
        }
        let attachments = [];
        let nextLesson = null;
        let nextChapter = null;
        attachments = course.attachments;
        const userProgress = yield db_1.db.userProgress.findUnique({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
        });
        return {
            chapter,
            lesson,
            course,
            attachments,
            userProgress,
        };
    }
    catch (error) {
        console.log("[GET_CHAPTER]", error);
        return {
            lesson: null,
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextLesson: null,
            userProgress: null,
        };
    }
});
exports.getChapter = getChapter;
