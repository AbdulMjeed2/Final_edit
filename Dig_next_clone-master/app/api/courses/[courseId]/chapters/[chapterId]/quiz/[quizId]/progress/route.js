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
exports.PUT = PUT;
exports.GET = GET;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function PUT(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const { points, userSelections } = yield req.json();
            console.log(userSelections);
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const userQuizPoints = yield db_1.db.userQuizPoints.upsert({
                where: {
                    userId_quizId: {
                        userId,
                        quizId: params.quizId,
                    },
                },
                update: {
                    points,
                },
                create: {
                    userId,
                    quizId: params.quizId,
                    points,
                },
            });
            const userStats = yield db_1.db.userStats.findUnique({
                where: {
                    id: userId
                }
            });
            if (userStats) {
                const editedUserStats = yield db_1.db.userStats.update({
                    where: {
                        id: userId
                    },
                    data: {
                        quizsCompleted: userStats.quizsCompleted + 1
                    }
                });
            }
            else {
                const newUserStats = yield db_1.db.userStats.create({
                    data: {
                        id: userId,
                        quizsCompleted: 1
                    }
                });
            }
            const oldSelection = yield db_1.db.examOptions.findFirst({
                where: {
                    examId: params.quizId,
                    userId
                }
            });
            if (oldSelection) {
                yield db_1.db.examOptions.update({
                    where: {
                        id: oldSelection.id
                    },
                    data: {
                        options: JSON.stringify(userSelections)
                    }
                });
            }
            else {
                yield db_1.db.examOptions.create({
                    data: {
                        examId: params.quizId,
                        userId: userId,
                        options: JSON.stringify(userSelections)
                    }
                });
            }
            return server_2.NextResponse.json(userQuizPoints);
        }
        catch (error) {
            console.log("[CHAPTER_ID_POINTS]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const selections = yield db_1.db.examOptions.findFirst({
                where: {
                    userId,
                    examId: params.quizId
                }
            });
            return server_2.NextResponse.json(selections);
        }
        catch (error) {
            console.log("[CHAPTER_ID_POINTS]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
