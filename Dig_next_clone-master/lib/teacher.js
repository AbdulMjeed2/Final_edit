"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTeacher = void 0;
const isTeacher = (userId) => {
    return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
};
exports.isTeacher = isTeacher;
