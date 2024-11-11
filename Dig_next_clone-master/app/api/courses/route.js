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
exports.GET = GET;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
const teacher_1 = require("@/lib/teacher");
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            const { title } = yield req.json();
            if (!userId || !(0, teacher_1.isTeacher)(userId)) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const course = yield db_1.db.course.create({
                data: {
                    userId,
                    title,
                },
            });
            return server_2.NextResponse.json(course);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = (0, server_1.auth)();
        if (!userId) {
            return new server_2.NextResponse("Unauthorized", { status: 401 });
        }
        const courses = yield db_1.db.course.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return server_2.NextResponse.json(courses);
    });
}
