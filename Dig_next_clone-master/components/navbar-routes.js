"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarRoutes = void 0;
const nextjs_1 = require("@clerk/nextjs");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const search_input_1 = require("./search-input");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_2 = require("next/navigation");
const NavbarRoutes = () => {
    const { userId } = (0, nextjs_1.useAuth)();
    const pathname = (0, navigation_1.usePathname)();
    const isTeacherPage = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/teacher");
    const isCoursePage = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/courses");
    const isIntroductionCoursePage = pathname === null || pathname === void 0 ? void 0 : pathname.includes(process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID);
    const isIntroductionCourseEditPage = (pathname === null || pathname === void 0 ? void 0 : pathname.includes(process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID)) && (pathname === null || pathname === void 0 ? void 0 : pathname.includes('teacher'));
    const isSearchPage = pathname === "/search";
    const isStudentPage = pathname === null || pathname === void 0 ? void 0 : pathname.includes("/students");
    const isTaskPage = (pathname === null || pathname === void 0 ? void 0 : pathname.includes("/students")) && (pathname === null || pathname === void 0 ? void 0 : pathname.includes("/course"));
    const isReplyPage = pathname === null || pathname === void 0 ? void 0 : pathname.includes("/message/");
    const router = (0, navigation_2.useRouter)();
    const UserButtonWrapper = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@clerk/nextjs'))).then(module => module.UserButton), {
        ssr: false // Ensure component is not rendered on the server-side
    });
    return (<>
      {isSearchPage && (<div className="hidden md:block">
          <search_input_1.SearchInput />
        </div>)}
      <div className="flex gap-x-2 ml-auto">
        

      </div>
      <div className="flex gap-x-2 ml-auto">
          <div id="google_translate_element "></div>

          <UserButtonWrapper signInUrl="/sign-in"/>
          {isStudentPage && !isTaskPage && (<link_1.default href="/teacher/analytics">
              <button_1.Button size="sm" variant="ghost">
                <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
                عودة
              </button_1.Button>
            </link_1.default>)}
          {isTaskPage && (<link_1.default href='' onClick={e => { return router.back(); }}>
              <button_1.Button size="sm" variant="ghost">
                <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
                عودة
              </button_1.Button>
            </link_1.default>)}
        {isCoursePage && !isIntroductionCoursePage ? (<link_1.default href="/">
            <button_1.Button size="sm" variant="ghost">
              <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
              عودة
            </button_1.Button>
          </link_1.default>) : null}
        {isIntroductionCourseEditPage ? (<link_1.default href={`/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`}>
            <button_1.Button size="sm" variant="ghost">
              <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
              عودة
            </button_1.Button>
          </link_1.default>) : null}
        {isReplyPage ? (<link_1.default href="/message">
            <button_1.Button size="sm" variant="ghost">
              <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
              عودة
            </button_1.Button>
          </link_1.default>) : null}
      </div>
    </>);
};
exports.NavbarRoutes = NavbarRoutes;
