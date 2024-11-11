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
exports.POST = POST;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function POST(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const { text } = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const optionQuestion = yield db_1.db.examQuestion.findUnique({
                where: {
                    id: params.questionId,
                    examId: params.examId,
                },
                include: {
                    options: true,
                },
            });
            if (!optionQuestion) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const lastOption = yield db_1.db.examQuestionOption.findFirst({
                where: {
                    questionId: params.questionId,
                },
                orderBy: {
                    position: "desc",
                },
            });
            const newPosition = lastOption ? lastOption.position + 1 : 1;
            if (optionQuestion.options.length > 3) {
                return new server_2.NextResponse("Maximum question options reached", {
                    status: 400,
                });
            }
            else {
                const option = yield db_1.db.examQuestionOption.create({
                    data: {
                        text,
                        questionId: params.questionId,
                        position: newPosition,
                    },
                });
                return server_2.NextResponse.json(option);
            }
        }
        catch (error) {
            console.log("[QUESTION_OPTION]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
