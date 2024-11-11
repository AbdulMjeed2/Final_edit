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
exports.DELETE = DELETE;
exports.PATCH = PATCH;
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
            if (!exam) {
                return new server_2.NextResponse("Not Found", { status: 404 });
            }
            const deletedExam = yield db_1.db.exam.delete({
                where: {
                    id: params.examId,
                },
            });
            const publishedExamInCourse = yield db_1.db.exam.findMany({
                where: {
                    courseId: params.courseId,
                    isPublished: true,
                },
            });
            if (!publishedExamInCourse.length) {
                yield db_1.db.course.update({
                    where: {
                        id: params.courseId,
                    },
                    data: {
                        isPublished: false,
                    },
                });
            }
            return server_2.NextResponse.json(deletedExam);
        }
        catch (error) {
            console.log("[EXAM_ID_DELETE]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const values = __rest(yield req.json(), []);
            console.log(values);
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const ownCourse = yield db_1.db.course.findUnique({
                where: {
                    id: params.courseId,
                    userId,
                },
            });
            const studentId = (values === null || values === void 0 ? void 0 : values.userId) === userId;
            console.log(values);
            if (!ownCourse && !studentId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const exam = yield db_1.db.exam.update({
                where: {
                    id: params.examId,
                    courseId: params.courseId,
                },
                data: Object.assign({}, values),
            });
            const examProgress = yield db_1.db.userProgress.findFirst({
                where: {
                    userId,
                    lessonId: params.examId,
                },
            });
            if (examProgress) {
                const completeExam = yield db_1.db.userProgress.update({
                    data: {
                        userId: userId,
                        lessonId: params.examId,
                        isCompleted: true,
                        percentage: values.afterScore,
                    },
                    where: {
                        id: examProgress.id,
                    },
                });
            }
            else {
                const completeExam = yield db_1.db.userProgress.create({
                    data: {
                        userId: userId,
                        lessonId: params.examId,
                        isCompleted: true,
                        percentage: values.afterScore,
                    },
                });
            }
            const userStats = yield db_1.db.userStats.findUnique({
                where: {
                    id: userId,
                },
            });
            if (userStats) {
                const editedUserStats = yield db_1.db.userStats.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        examsCompleted: userStats.examsCompleted + 1,
                    },
                });
            }
            else {
                const newUserStats = yield db_1.db.userStats.create({
                    data: {
                        id: userId,
                        examsCompleted: 1,
                    },
                });
            }
            const oldSelection = yield db_1.db.examOptions.findFirst({
                where: {
                    examId: params.examId,
                    userId,
                },
            });
            if (oldSelection) {
                yield db_1.db.examOptions.update({
                    where: {
                        id: oldSelection.id,
                    },
                    data: {
                        options: JSON.stringify(values.userSelections),
                    },
                });
            }
            else {
                console.log("test1111", values);
                yield db_1.db.examOptions.create({
                    data: {
                        examId: params.examId,
                        userId: userId,
                        options: JSON.stringify(values),
                    },
                });
            }
            return server_2.NextResponse.json(exam);
        }
        catch (error) {
            console.log("[EXAM_ID]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
