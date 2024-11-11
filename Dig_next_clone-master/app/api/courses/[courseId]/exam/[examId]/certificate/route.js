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
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const exam = yield db_1.db.exam.findUnique({
                where: {
                    id: params.examId,
                },
                include: {
                    course: true,
                },
            });
            if (!exam) {
                return new server_2.NextResponse("Unauthorized", { status: 503 });
            }
            const certificate = yield db_1.db.certificate.create({
                data: {
                    examId: params.examId,
                    courseTitle: exam.course.title,
                    userId: userId
                },
            });
            console.log("line 37", certificate);
            return server_2.NextResponse.json(certificate);
        }
        catch (error) {
            console.error("CERTIFICATE_ID_EXAM", error);
            console.log("====================================");
            console.log(error);
            console.log("====================================");
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
