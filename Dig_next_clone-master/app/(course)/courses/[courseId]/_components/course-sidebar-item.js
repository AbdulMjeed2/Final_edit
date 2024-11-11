"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSidebarItem = void 0;
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const LockIconWrapper_1 = __importDefault(require("./LockIconWrapper"));
const nextjs_1 = require("@clerk/nextjs");
const utils_1 = require("@/lib/utils");
const accordion_1 = require("@/components/ui/accordion");
const react_1 = require("react");
const CourseSidebarItem = ({ label, lessons, id, courseId, exam, quiz, starterExam, starterExamProgress, }) => {
    var _a;
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const { userId } = (0, nextjs_1.useAuth)();
    const accordionTrigerRef = (0, react_1.useRef)(null);
    const isActive = pathname === null || pathname === void 0 ? void 0 : pathname.includes(id);
    const isChapterCompleted = lessons.every((lesson) => {
        var _a;
        return (_a = lesson.userProgress) === null || _a === void 0 ? void 0 : _a.every((progress) => progress.userId === userId && progress.isCompleted === true);
    });
    const hasTakenQuiz = quiz &&
        ((_a = quiz.userQuizPoints) === null || _a === void 0 ? void 0 : _a.find((userQuizPoint) => userQuizPoint.userId === userId)) !== undefined;
    const handleLessonClick = (lessonId) => {
        router.replace(`/courses/${courseId}/chapters/${id}/lessons/${lessonId}`);
    };
    const handleQuizClick = (quizId) => {
        router.push(`/courses/${courseId}/chapters/${id}/quiz/${quizId}`);
    };
    const handleChapterClick = () => {
        (0, navigation_1.redirect)(`/courses/${courseId}/chapters/${id}`);
    };
    (0, react_1.useEffect)(() => {
        const ref = accordionTrigerRef.current;
        const handleClick = () => {
            if ((ref === null || ref === void 0 ? void 0 : ref.dataset.state) === "open") {
                handleChapterClick();
            }
        };
        ref === null || ref === void 0 ? void 0 : ref.addEventListener("click", handleClick);
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            ref === null || ref === void 0 ? void 0 : ref.removeEventListener("click", handleClick);
        };
    }, [handleChapterClick]); // Empty dependency array to run the effect only once
    return (<>
      <accordion_1.Accordion type="single" collapsible>
        <accordion_1.AccordionItem value={label}>
          <accordion_1.AccordionTrigger ref={accordionTrigerRef} className={(0, utils_1.cn)("flex items-center text-sky-500 text-right gap-x-2  text-sm font-[500] pl-6 pr-4 py-4 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive &&
            "text-slate-700 bg-sky-200/20 hover:bg-slate-200/20 hover:text-slate-700", isChapterCompleted &&
            "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700")}>
            <div className="ml-auto">{label}</div>
          </accordion_1.AccordionTrigger>
          <accordion_1.AccordionContent className="pb-0 w-full">
            {lessons.map((lesson, index) => {
            var _a, _b, _c;
            return (<button key={index} onClick={() => handleLessonClick(lesson.id)} type="button" disabled={lesson.lock || false} className={(0, utils_1.cn)("flex items-center justify-end w-full gap-x-2 text-slate-600 text-sm font-[500] transition-all px-4 hover:text-slate-700 hover:bg-slate-300/20 border-r-4 border-opacity-0 hover:border-opacity-100  border-sky-700 h-full", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(lesson.id)) &&
                    "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(lesson.id)) &&
                    ((_a = lesson.userProgress) === null || _a === void 0 ? void 0 : _a.some((progress) => progress.userId === userId && progress.isCompleted)) &&
                    "text-sky-700 bg-emerald-200/20 hover:bg-emerald-200/20 hover:text-emerald-700", ((_b = lesson.userProgress) === null || _b === void 0 ? void 0 : _b.some((progress) => progress.userId === userId && progress.isCompleted)) && "text-sky-700")}>
                    <div className="flex items-center justify-between text-right w-full gap-x-2 py-4">
                      {((_c = lesson.userProgress) === null || _c === void 0 ? void 0 : _c.some((progress) => progress.userId === userId && progress.isCompleted)) ? (<lucide_react_1.CheckCircle size={22} className={(0, utils_1.cn)("flex-shrink-0", "text-sky-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(lesson.id)) && "text-sky-700")}/>) : lesson.lock == true ? (<LockIconWrapper_1.default className={(0, utils_1.cn)("text-slate-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(lesson.id)) && "text-slate-700")}/>) : (<lucide_react_1.PlayCircle size={22} className={(0, utils_1.cn)("flex-shrink-0", "text-slate-500", (pathname === null || pathname === void 0 ? void 0 : pathname.includes(lesson.id)) && "text-slate-700")}/>)}
                      <div className="">{lesson.title}</div>
                    </div>
                  </button>);
        })}
            {quiz && (<button onClick={() => {
                handleQuizClick(quiz.id);
            }} disabled={quiz.lock ? true : false} type="button" className={(0, utils_1.cn)(`flex ${(pathname === null || pathname === void 0 ? void 0 : pathname.includes(quiz.id))
                ? "bg-emerald-200/20 hover:bg-emerald-200/20 hover:text-emerald-700"
                : ""} mt-auto items-center justify-end w-full gap-x-2 text-yellow-600 text-sm font-[500] transition-all px-4 hover:text-yellow-700 hover:bg-sky-300/20 border-r-4 border-opacity-0 hover:border-opacity-100  border-orange-600 h-full`, hasTakenQuiz &&
                ` ${quiz.lock
                    ? "text-yellow-600 hover:text-yellow-700"
                    : "text-sky-600 hover:text-sky-700"} hover:bg-yellow-200/20  border-yellow-700`)}>
                <div className="flex items-center justify-between text-right w-full gap-x-2 py-4">
                  {quiz.lock ? (<LockIconWrapper_1.default className="text-yellow-600 hover:text-yellow-700"/>) : hasTakenQuiz ? (<lucide_react_1.CheckCircle size={22} className={(0, utils_1.cn)("text-sky-500")}/>) : (<lucide_react_1.PlayCircle size={22} className={(0, utils_1.cn)("text-yellow-600 hover:text-yellow-700")}/>)}
                  <div>
                    <span></span>
                    {quiz.title}
                  </div>
                </div>
              </button>)}
          </accordion_1.AccordionContent>
        </accordion_1.AccordionItem>
      </accordion_1.Accordion>
    </>);
};
exports.CourseSidebarItem = CourseSidebarItem;
