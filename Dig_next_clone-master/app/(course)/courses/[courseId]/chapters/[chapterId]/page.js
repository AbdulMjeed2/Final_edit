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
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const ChapterIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, }) {
    var _b;
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const chapter = yield db_1.db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            lessons: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
    if (!chapter) {
        return (0, navigation_1.redirect)("/");
    }
    return (0, navigation_1.redirect)(`${params.chapterId}/lessons/${(_b = chapter.lessons) === null || _b === void 0 ? void 0 : _b[0].id}`);
});
exports.default = ChapterIdPage;
