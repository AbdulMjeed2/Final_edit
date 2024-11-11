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
exports.default = Dashboard;
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const courses_list_1 = require("@/components/courses-list");
const info_card_1 = require("./_components/info-card");
const get_courses_1 = require("@/actions/get-courses");
const dialogueBox_1 = require("../../_components/dialogueBox");
function Dashboard() {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = (0, server_1.auth)();
        if (!userId) {
            return (0, navigation_1.redirect)("/");
        }
        const introductionCourseId = process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID;
        const coursesNot = yield (0, get_courses_1.getCourses)({ userId });
        const courses = coursesNot.filter((e) => e.id != introductionCourseId);
        const coursesInProgress = courses.filter((courses) => courses.progress > 0 && courses.progress < 100);
        const completedCourses = courses.filter((courses) => courses.progress > 0 && courses.progress == 100);
        const coursesNotStartedYet = courses.filter((courses) => courses.progress == 0);
        return (<div>
      <dialogueBox_1.DialogBox page="coursesPage"/>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <info_card_1.InfoCard icon={lucide_react_1.Clock} label="في تَقَدم" numberOfItems={coursesInProgress.length}/>
          <info_card_1.InfoCard icon={lucide_react_1.CheckCircle} label="مكتمل" numberOfItems={completedCourses.length} variant="success"/>
        </div>
        <courses_list_1.CoursesList items={[
                ...completedCourses,
                ...coursesInProgress,
                ...coursesNotStartedYet,
            ]}/>
      </div>
    </div>);
    });
}
