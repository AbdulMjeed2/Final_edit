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
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function PUT(req_1, _a) {
    return __awaiter(this, arguments, void 0, function* (req, { params }) {
        try {
            const { userId } = (0, server_1.auth)();
            const { isCompleted, startedAt } = yield req.json();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const userProgress = yield db_1.db.userProgress.upsert({
                where: {
                    userId_lessonId: {
                        userId,
                        lessonId: params.lessonId,
                    },
                },
                update: {
                    isCompleted,
                },
                create: {
                    userId,
                    lessonId: params.lessonId,
                    isCompleted,
                    startedAt: startedAt
                },
            });
            const userStats = yield db_1.db.userStats.findUnique({
                where: {
                    id: userId
                }
            });
            console.log(userStats);
            if (userStats) {
                const editedUserStats = yield db_1.db.userStats.update({
                    where: {
                        id: userId
                    },
                    data: {
                        lessonsCompleted: isCompleted ? userStats.lessonsCompleted + 1 : userStats.lessonsCompleted - 1
                    }
                });
            }
            else {
                const newUserStats = yield db_1.db.userStats.create({
                    data: {
                        id: userId,
                        lessonsCompleted: 1
                    }
                });
            }
            console.log(userProgress);
            return server_2.NextResponse.json(userProgress);
        }
        catch (error) {
            console.log("[CHAPTER_ID_PROGRESS]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
