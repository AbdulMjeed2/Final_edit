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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSidebar = void 0;
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const course_progress_1 = require("@/components/course-progress");
const course_sidebar_item_1 = require("./course-sidebar-item");
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const headers_1 = require("next/headers");
const LockIconWrapper_1 = __importDefault(require("./LockIconWrapper"));
const CourseSidebar = (_a) => __awaiter(void 0, [_a], void 0, function* ({ course, progressCount, }) {
    var _b, _c;
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const headersList = (0, headers_1.headers)();
    const task = yield db_1.db.task.findFirst({ where: { courseId: course.id, isPublished: true } });
    const pathname = headersList.get("referer") || "";
    const takingExamination = pathname === null || pathname === void 0 ? void 0 : pathname.includes("exam");
    const viewingCertificate = pathname === null || pathname === void 0 ? void 0 : pathname.includes("certificate");
    const takingQuiz = pathname === null || pathname === void 0 ? void 0 : pathname.includes("quiz");
    const starterExam = yield db_1.db.exam.findFirst({
        where: {
            courseId: course.id,
            isPublished: true,
            starterExam: true
        },
        include: {
            certificate: true,
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
    const starterExamProgress = yield db_1.db.userProgress.findFirst({
        where: {
            lessonId: starterExam === null || starterExam === void 0 ? void 0 : starterExam.id,
            userId: userId
        }
    });
    const exam = yield db_1.db.exam.findFirst({
        where: {
            courseId: course.id,
            isPublished: true,
            starterExam: false
        },
        include: {
            certificate: true,
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
    const certificateId = (_b = exam === null || exam === void 0 ? void 0 : exam.certificate) === null || _b === void 0 ? void 0 : _b.find((certificate) => { return certificate.userId === userId && certificate.nameOfStudent != null; });
    const hasCertificate = certificateId != undefined;
    const taskProgress = yield db_1.db.userProgress.findFirst({ where: { lessonId: task === null || task === void 0 ? void 0 : task.id, userId: userId } });
    const taskCompleted = taskProgress === null || taskProgress === void 0 ? void 0 : taskProgress.isCompleted;
    const examCompleted = yield db_1.db.userProgress.findFirst({
        where: {
            lessonId: exam === null || exam === void 0 ? void 0 : exam.id,
            userId: userId
        }
    });
    const certificate1 = yield db_1.db.certificate.findMany({
        where: {
            userId: userId,
            examId: exam === null || exam === void 0 ? void 0 : exam.id,
            NOT: {
                nameOfStudent: undefined
            }
        },
    });
    const certificate = certificate1.filter(e => e.nameOfStudent);
    console.log("Certificate" + certificate);
    const handleLessonClick = (examId) => {
        (0, navigation_1.redirect)(`/courses/${course.id}/exam/${examId}`);
    };
    // if (progressCount === 90 && exam) {
    //   redirect(`/courses/${course.id}/exam/${exam?.id}`);
    // }
    return (<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b" dir="rtl">
        <h1 className="font-semibold">{course.title}</h1>
        <div className="mt-10">
          <course_progress_1.CourseProgress variant="default" value={progressCount}/>
        </div>
      </div>
      <div className="flex flex-col w-full">
      {starterExam && (<button type="button" disabled={true} className={(0, utils_1.cn)(`flex items-center ${pathname.includes((starterExamProgress === null || starterExamProgress === void 0 ? void 0 : starterExamProgress.lessonId) || "") ? "text-red-700" : ""} justify-end w-full gap-x-2 ${(starterExamProgress === null || starterExamProgress === void 0 ? void 0 : starterExamProgress.isCompleted) ? 'text-sky-700' : 'text-slate-600'}  text-sm font-[500] transition-all px-4 hover:text-slate-700 hover:bg-gray-300 border-r-4 border-opacity-0 hover:border-opacity-95 border-gray-600 h-full`)}>
              <div className="flex items-center justify-between text-right w-full gap-x-2 py-4">
                {(starterExamProgress === null || starterExamProgress === void 0 ? void 0 : starterExamProgress.isCompleted) ? (<lucide_react_1.CheckCircle size={22} className={(0, utils_1.cn)("text-sky-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(starterExam.id)) && "text-gray-800")}/>) : (<lucide_react_1.PlayCircle size={22} className={(0, utils_1.cn)("text-slate-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(starterExam.id)) && "text-slate-700")}/>)}
                <div>{starterExam.title}</div>
              </div>
            </button>)}
        {course.chapters.map((chapter, chapterIndex) => {
            var _a;
            let a = [];
            let tempLessons = chapter.lessons;
            chapter.lessons.map((lesson, index) => {
                var _a, _b;
                let tempLessons = chapter.lessons.slice(0, index + 1);
                for (let i = 0; i < tempLessons.length; i++) {
                    if (!(starterExamProgress === null || starterExamProgress === void 0 ? void 0 : starterExamProgress.isCompleted)) {
                        lesson.lock = true;
                    }
                    else if (index == 0) {
                        if (chapterIndex == 0) {
                            lesson.lock = false;
                        }
                        else {
                            let previousChapter = course.chapters[chapterIndex - 1];
                            for (let i = 0; i < previousChapter.lessons.length; i++) {
                                const element = previousChapter.lessons[i];
                                let userProgressBool = (_a = element.userProgress) === null || _a === void 0 ? void 0 : _a.some((progress) => progress.userId === userId && progress.isCompleted);
                                if (!userProgressBool) {
                                    lesson.lock = true;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        let userProgressBool = (_b = tempLessons[i].userProgress) === null || _b === void 0 ? void 0 : _b.some((progress) => progress.userId === userId && progress.isCompleted);
                        if (!userProgressBool && i != index) {
                            lesson.lock = true;
                            break;
                        }
                        else {
                            lesson.lock = false;
                        }
                    }
                }
                a.push(lesson);
            });
            for (let i = 0; i < chapter.lessons.length; i++) {
                const element = chapter.lessons[i];
                let userProgressBool = (_a = element.userProgress) === null || _a === void 0 ? void 0 : _a.some((progress) => progress.userId === userId && progress.isCompleted);
                if (!userProgressBool) {
                    if (chapter.quiz) {
                        chapter.quiz.lock = true;
                        break;
                    }
                }
            }
            return (<course_sidebar_item_1.CourseSidebarItem key={chapter.id} id={chapter.id} label={chapter.title} courseId={course.id} lessons={a} quiz={chapter.quiz} exam={exam} starterExam={starterExam} starterExamProgress={starterExamProgress}/>);
        })}
      </div>
      <div>
        {(task === null || task === void 0 ? void 0 : task.id) && (<link_1.default type="button" href={(progressCount >= 90) ? `/courses/${course.id}/task/${task.id}` : "#"} className={(0, utils_1.cn)(`flex items-center ${pathname.includes((starterExamProgress === null || starterExamProgress === void 0 ? void 0 : starterExamProgress.lessonId) || "") ? "text-red-700" : ""} justify-end w-full gap-x-2 text-slate-600 text-sm font-[500] transition-all px-4 hover:text-slate-700 hover:bg-gray-300 border-r-4 border-opacity-0 hover:border-opacity-95 border-gray-600 h-full`)}>
                <div className="flex items-center justify-between text-right w-full gap-x-2 py-4">
                  {!(progressCount >= 90) ? (<LockIconWrapper_1.default className={(0, utils_1.cn)("text-gray-700", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(exam === null || exam === void 0 ? void 0 : exam.id)) && "text-gray-800")}/>) : !taskCompleted ? <lucide_react_1.PlayCircle size={22} className={(0, utils_1.cn)("text-slate-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(exam === null || exam === void 0 ? void 0 : exam.id)) && "text-slate-700")}/> : (<lucide_react_1.CheckCircle size={22} className={(0, utils_1.cn)("text-slate-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(exam === null || exam === void 0 ? void 0 : exam.id)) && "text-slate-700")}/>)}
                  <div> {task.title}</div>
                </div>
              </link_1.default>)}

      </div>
      <div>
        {(exam === null || exam === void 0 ? void 0 : exam.id) && (<link_1.default type="button" href={((progressCount >= 90) && taskCompleted) ? `/courses/${course.id}/exam/${exam === null || exam === void 0 ? void 0 : exam.id}` : "#"} className={(0, utils_1.cn)(`flex items-center ${pathname.includes((starterExamProgress === null || starterExamProgress === void 0 ? void 0 : starterExamProgress.lessonId) || "") ? "text-red-700" : ""} justify-end w-full gap-x-2 ${(examCompleted === null || examCompleted === void 0 ? void 0 : examCompleted.isCompleted) ? "text-sky-700" : 'text-slate-600'} text-sm font-[500] transition-all px-4 hover:text-slate-700 hover:bg-gray-300 border-r-4 border-opacity-0 hover:border-opacity-95 border-gray-600 h-full`)}>
                <div className="flex items-center justify-between text-right w-full gap-x-2 py-4">
                  {(!(progressCount >= 90) || !taskCompleted) ? (<LockIconWrapper_1.default className={(0, utils_1.cn)("text-gray-700", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(exam === null || exam === void 0 ? void 0 : exam.id)) && "text-gray-800")}/>) : !(examCompleted === null || examCompleted === void 0 ? void 0 : examCompleted.isCompleted) ? <lucide_react_1.PlayCircle size={22} className={(0, utils_1.cn)("text-slate-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(exam === null || exam === void 0 ? void 0 : exam.id)) && "text-slate-700")}/> : (<lucide_react_1.CheckCircle size={22} className={(0, utils_1.cn)("text-sky-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(exam === null || exam === void 0 ? void 0 : exam.id)) && "text-sky-700")}/>)}
                  <div>{exam.title}</div>
                </div>
              </link_1.default>)}

      </div>
      {(exam === null || exam === void 0 ? void 0 : exam.id) &&
            ((_c = certificate[0]) === null || _c === void 0 ? void 0 : _c.nameOfStudent) != null &&
            <div className="relative h-full ">
                <link_1.default href={`/courses/${course.id}/exam/${exam === null || exam === void 0 ? void 0 : exam.id}/certificate/${certificate[0].id}`} className="absolute bottom-8 right-16 bg-sky-700 py-4 px-8 text-white"> انظر شهادتك</link_1.default>
        </div>}
    </div>);
});
exports.CourseSidebar = CourseSidebar;
