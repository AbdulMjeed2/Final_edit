"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teacher_1 = require("@/lib/teacher");
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const TeacherLayout = ({ children }) => {
    const { userId } = (0, server_1.auth)();
    if (!(0, teacher_1.isTeacher)(userId)) {
        return (0, navigation_1.redirect)("/");
    }
    return <>{children}</>;
};
exports.default = TeacherLayout;
