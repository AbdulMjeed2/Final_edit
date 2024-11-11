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
    return __awaiter(this, arguments, void 0, function* (req, { params, }) {
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
            const question = yield db_1.db.quizQuestion.findUnique({
                where: {
                    id: params.questionId,
                    quizId: params.quizId,
                },
            });
            if (!question) {
                return new server_2.NextResponse("Not Found", { status: 404 });
            }
            const deletedQuestion = yield db_1.db.quizQuestion.delete({
                where: {
                    id: params.questionId,
                },
            });
            const publishedQuestionInExam = yield db_1.db.quizQuestion.findMany({
                where: {
                    quizId: params.quizId,
                    isPublished: true,
                },
            });
            if (!publishedQuestionInExam.length) {
                yield db_1.db.quizQuestion.update({
                    where: {
                        id: params.quizId,
                    },
                    data: {
                        isPublished: false,
                    },
                });
            }
            return server_2.NextResponse.json(deletedQuestion);
        }
        catch (error) {
            console.log("[QUESTION_ID_DELETE]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params, }) {
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
            const question = yield db_1.db.quizQuestion.update({
                where: {
                    id: params.questionId,
                    quizId: params.quizId,
                },
                data: Object.assign({}, values),
            });
            return server_2.NextResponse.json(question);
        }
        catch (error) {
            console.log("[EXAM_QUESTION_ID]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
