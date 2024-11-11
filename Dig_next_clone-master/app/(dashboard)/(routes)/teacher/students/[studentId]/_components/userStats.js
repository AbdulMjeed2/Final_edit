"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("next/navigation");
const react_1 = __importDefault(require("react"));
const UserStats = ({ timeString, studentId, course, finalExamsPrgress, firstExamsPrgress, lessonsCompleted, quizsCompleted }) => {
    const router = (0, navigation_1.useRouter)();
    const handleNavigate = () => {
        return router.push(`/teacher/students/${studentId}/course/${course.id}`);
    };
    return (<tr className='text-base'>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">{course.title}</td>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">%{Math.round(course === null || course === void 0 ? void 0 : course.progress)}</td>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">%{firstExamsPrgress ? firstExamsPrgress : 0}</td>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">%{finalExamsPrgress ? finalExamsPrgress : 0}</td>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">{lessonsCompleted}</td>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">{quizsCompleted}</td>
            <td className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">{timeString}</td>
            <td onClick={handleNavigate} className="px-2 py-2 cursor-pointer hover:text-gray-800 font-semibold">تقرير</td>
        </tr>);
};
exports.default = UserStats;
