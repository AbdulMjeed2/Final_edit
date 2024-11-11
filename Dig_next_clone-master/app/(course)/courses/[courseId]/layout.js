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
const get_progress_1 = require("@/actions/get-progress");
const course_sidebar_1 = require("./_components/course-sidebar");
const course_navbar_1 = require("./_components/course-navbar");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const chatbot_popup_1 = require("./_components/chatbot-popup");
const headers_1 = require("next/headers");
const sidebar_1 = require("@/app/(dashboard)/_components/sidebar");
const navbar_1 = require("@/app/(dashboard)/_components/navbar");
const CourseLayout = (_a) => __awaiter(void 0, [_a], void 0, function* ({ children, params, }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const course = yield db_1.db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    lessons: {
                        where: {
                            isPublished: true,
                        },
                        include: {
                            userProgress: {
                                where: {
                                    userId,
                                },
                            },
                        },
                        orderBy: {
                            position: "asc",
                        },
                    },
                    quiz: {
                        where: {
                            isPublished: true,
                        },
                        include: {
                            userQuizPoints: {
                                where: {
                                    userId,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
    const exam = yield db_1.db.exam.findMany({
        where: {
            courseId: params.courseId,
            userId: userId,
        },
        include: {
            questions: {
                where: {
                    isPublished: true,
                },
                include: {
                    options: true,
                },
            },
        },
    });
    if (!course) {
        return (0, navigation_1.redirect)("/");
    }
    let starterExam = exam.filter((e) => e.starterExam == true)[0];
    const isIntroductionCoursePage = course.id == process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID;
    let progressCount = yield (0, get_progress_1.getProgress)(userId, course.id);
    console.log(progressCount);
    const headersList = (0, headers_1.headers)();
    const fullUrl = headersList.get('referer') || "";
    const isInExam = fullUrl.includes("exam") == true;
    return (<div className="h-full">
      <div className={`h-[80px] ${isIntroductionCoursePage ? "md:pr-56" : "md:pr-80 "} fixed inset-y-0 w-full z-50`}>
        
        {course.id == process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID ? <navbar_1.Navbar /> : <course_navbar_1.CourseNavbar course={course} progressCount={progressCount}/>}
      </div>
      <div className={`hidden md:flex h-full ${isIntroductionCoursePage ? "md:w-56" : "w-80"} flex-col fixed right-0 inset-y-0 z-40`}>
        {course.id == process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID ? <sidebar_1.Sidebar /> : <course_sidebar_1.CourseSidebar course={course} progressCount={progressCount}/>}
        
      </div>
      <main className={`${isIntroductionCoursePage ? "md:pr-56" : "md:pr-80 "} pt-[80px] h-full`}>{children}</main>
      {!isInExam && <div className="fixed left-5 bottom-5 z-50">
        <chatbot_popup_1.ChatWidget>
          <button_1.Button variant="outline" className="bg-sky-700 rounded-full p-4 h-14 w-14 shadow-md hover:bg-sky-600">
            <lucide_react_1.MessageCircle size={30} color="white"/>
          </button_1.Button>
        </chatbot_popup_1.ChatWidget>
      </div>}
      
    </div>);
});
exports.default = CourseLayout;
