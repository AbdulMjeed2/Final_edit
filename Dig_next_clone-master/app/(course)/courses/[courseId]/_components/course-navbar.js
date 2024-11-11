"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseNavbar = void 0;
const navbar_routes_1 = require("@/components/navbar-routes");
const course_mobile_sidebar_1 = require("./course-mobile-sidebar");
const CourseNavbar = ({ course, progressCount }) => {
    return (<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <course_mobile_sidebar_1.CourseMobileSidebar course={course} progressCount={progressCount}/>
      <navbar_routes_1.NavbarRoutes />
    </div>);
};
exports.CourseNavbar = CourseNavbar;
