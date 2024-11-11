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
exports.getDashboardCourses = void 0;
const db_1 = require("@/lib/db");
const get_progress_1 = require("@/actions/get-progress");
const getDashboardCourses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield db_1.db.course.findMany({
            where: {
                userId: userId,
                isPublished: true,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                },
            },
        });
        const coursesWithProgressWithCategory = courses;
        for (let course of coursesWithProgressWithCategory) {
            const progress = yield (0, get_progress_1.getProgress)(userId, course.id);
            course["progress"] = progress;
        }
        const completedCourses = coursesWithProgressWithCategory.filter((course) => course.progress === 100);
        const coursesInProgress = coursesWithProgressWithCategory.filter((course) => { var _a; return ((_a = course.progress) !== null && _a !== void 0 ? _a : 0) < 100; });
        return {
            completedCourses,
            coursesInProgress,
        };
    }
    catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        };
    }
});
exports.getDashboardCourses = getDashboardCourses;
