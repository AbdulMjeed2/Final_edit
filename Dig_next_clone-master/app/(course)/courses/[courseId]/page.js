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
const db_1 = require("@/lib/db");
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const CourseIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params }) {
    const { userId } = (0, server_1.auth)();
    const course = yield db_1.db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    lessons: {
                        where: {
                            isPublished: true,
                        },
                        orderBy: {
                            position: "asc",
                        },
                    },
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
    if (!course) {
        return (0, navigation_1.redirect)("/");
    }
    const task = yield db_1.db.task.findFirst({
        where: {
            courseId: course.id,
            isPublished: true,
        }
    });
    const StartExam = yield db_1.db.exam.findFirst({
        where: {
            courseId: params.courseId,
            starterExam: true
        },
        include: {
            questions: {
                where: {
                    isPublished: true,
                },
                include: {
                    options: true,
                },
            },
        },
    });
    const StartExamProgress = yield db_1.db.userProgress.findFirst({
        where: {
            lessonId: StartExam === null || StartExam === void 0 ? void 0 : StartExam.id,
            userId: userId
        },
    });
    if (StartExam) {
        if (StartExam.isPublished) {
            if (StartExamProgress === null || StartExamProgress === void 0 ? void 0 : StartExamProgress.isCompleted) {
            }
            else {
                (0, navigation_1.redirect)(`/courses/${course.id}/exam/${StartExam === null || StartExam === void 0 ? void 0 : StartExam.id}`);
            }
        }
    }
    // const StartExam = course.exams.filter((e:any) => e.starterExam == true)
    let currentLesson;
    let currentChapter;
    let currentQuiz;
    for (let i = 0; i < course.chapters.length; i++) {
        const chapter = course.chapters[i];
        const quiz = yield db_1.db.quiz.findFirst({
            where: {
                chapterId: chapter.id
            }
        });
        for (let j = 0; j < chapter.lessons.length; j++) {
            const lesson = chapter.lessons[j];
            const progress = yield db_1.db.userProgress.findFirst({ where: { lessonId: lesson.id, userId: userId } });
            if (progress === null || progress === void 0 ? void 0 : progress.isCompleted) {
            }
            else {
                currentLesson = lesson;
                currentChapter = chapter;
                break;
            }
        }
        if (currentLesson) {
            break;
        }
        if (quiz) {
            const quizPoints = yield db_1.db.userQuizPoints.findFirst({
                where: {
                    userId: userId,
                    quizId: quiz.id
                }
            });
            if (quiz.isPublished) {
                if (quizPoints) {
                }
                else {
                    currentChapter = chapter;
                    currentQuiz = quiz;
                    break;
                }
            }
        }
    }
    if (currentChapter && currentLesson) {
        return (0, navigation_1.redirect)(`/courses/${course.id}/chapters/${currentChapter === null || currentChapter === void 0 ? void 0 : currentChapter.id}/lessons/${currentLesson === null || currentLesson === void 0 ? void 0 : currentLesson.id}`);
    }
    else if (currentChapter && currentQuiz) {
        return (0, navigation_1.redirect)(`/courses/${course.id}/chapters/${currentChapter === null || currentChapter === void 0 ? void 0 : currentChapter.id}/quiz/${currentQuiz === null || currentQuiz === void 0 ? void 0 : currentQuiz.id}`);
    }
    else {
        const taskStatus = yield db_1.db.userProgress.findFirst({
            where: {
                lessonId: task === null || task === void 0 ? void 0 : task.id,
                userId
            }
        });
        if (!(taskStatus === null || taskStatus === void 0 ? void 0 : taskStatus.isCompleted)) {
            return (0, navigation_1.redirect)(`/courses/${course.id}/task/${task === null || task === void 0 ? void 0 : task.id}/`);
        }
        else {
            const finalExam = yield db_1.db.exam.findFirst({
                where: {
                    courseId: params.courseId,
                    starterExam: false
                },
                include: {
                    questions: {
                        where: {
                            isPublished: true,
                        },
                        include: {
                            options: true,
                        },
                    },
                },
            });
            if (finalExam === null || finalExam === void 0 ? void 0 : finalExam.isPublished) {
                return (0, navigation_1.redirect)(`/courses/${course.id}/exam/${finalExam === null || finalExam === void 0 ? void 0 : finalExam.id}`);
            }
            else {
                return (0, navigation_1.redirect)(`/courses/${course.id}/chapters/${course.chapters[0].id}/lessons/${course.chapters[0].lessons[0].id}`);
            }
        }
    }
});
exports.default = CourseIdPage;
