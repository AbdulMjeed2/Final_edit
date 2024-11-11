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
exports.GET = GET;
exports.DELETE = DELETE;
exports.PATCH = PATCH;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
const set_emails_1 = require("@/actions/set-emails");
function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const certificate = yield db_1.db.certificate.findUnique({
                where: {
                    id: params.certificateId,
                    userId: userId,
                },
            });
            if (!certificate) {
                return new server_2.NextResponse("Not found", { status: 404 });
            }
            return server_2.NextResponse.json(certificate);
        }
        catch (error) {
            console.log("[CERTIFICATE_GET]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
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
            const exam = yield db_1.db.exam.findUnique({
                where: {
                    id: params.examId,
                    courseId: params.courseId,
                },
            });
            if (!exam) {
                return new server_2.NextResponse("Not Found", { status: 404 });
            }
            const deletedCertificate = yield db_1.db.certificate.delete({
                where: {
                    id: params.certificateId,
                },
            });
            return server_2.NextResponse.json(deletedCertificate);
        }
        catch (error) {
            console.log("[CERTIFICATE_ID_DELETE]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const values = __rest(yield req.json(), []);
            (0, set_emails_1.sendMail)({ to: "raoufg716@gmail.com", from: 'sender19321232@gmail.com', body: "<h1>HELLO WORLD</h1>", subject: "the most importance subjecct in the wooorld" });
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const certificate = yield db_1.db.certificate.update({
                where: {
                    id: params.certificateId,
                    examId: params.examId,
                },
                data: Object.assign({ userId }, values),
            });
            console.log("LINE:106", certificate);
            return server_2.NextResponse.json(certificate);
        }
        catch (error) {
            console.log("[CERTIFICATE_ID]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
