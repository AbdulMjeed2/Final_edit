"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItem = void 0;
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const SidebarItem = ({ icon: Icon, label, href }) => {
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const isIntroductionCourseRoute = href.includes(`/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`);
    const isIntroductionCoursePage = pathname.includes(`/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`);
    const isActive = (pathname === "/" && href === "/") ||
        pathname === href ||
        (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith(`${href}/`));
    const onClick = () => {
        router.push(href);
    };
    return (<button onClick={onClick} type="button" className={`${isIntroductionCourseRoute
            ? isIntroductionCoursePage
                ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                : "hover:text-slate-600 hover:bg-slate-300/20"
            : isActive && !isIntroductionCoursePage
                ? "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                : "hover:text-slate-600 hover:bg-slate-300/20"} flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all `}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={(0, utils_1.cn)(`${isIntroductionCourseRoute
            ? isIntroductionCoursePage
                ? "opacity-100"
                : "text-slate-500"
            : isActive && !isIntroductionCoursePage
                ? "opacity-100"
                : "text-slate-500"} `)}/>
        {label}
      </div>
      <div className={`${isIntroductionCourseRoute
            ? isIntroductionCoursePage
                ? "opacity-100"
                : "text-slate-500"
            : isActive && !isIntroductionCoursePage
                ? "opacity-100"
                : "text-slate-500"} ml-auto opacity-0 border-2 border-sky-700 h-full transition-all`}/>
    </button>);
};
exports.SidebarItem = SidebarItem;
