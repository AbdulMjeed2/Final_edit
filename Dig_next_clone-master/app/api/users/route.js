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
exports.GET = GET;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const get_courses_1 = require("@/actions/get-courses");
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield server_1.clerkClient.users.getUserList();
            console.log(users);
            const usersWithCompletedCourses = yield Promise.all(users.data.map((user) => __awaiter(this, void 0, void 0, function* () {
                const courses = yield (0, get_courses_1.getCourses)({ userId: user.id });
                const completedCourses = courses.filter((e) => e.progress == 100);
                console.log(user);
                return Object.assign(Object.assign({}, user), { completedCourses: completedCourses.length });
            })));
            // console.log("data", usersWithCompletedCourses);
            return server_2.NextResponse.json({ data: usersWithCompletedCourses });
        }
        catch (error) {
            console.error("Error fetching users: ", error);
            return server_2.NextResponse.json({ error: "Failed to fetch users" });
        }
    });
}
