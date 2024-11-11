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
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const db_1 = require("@/lib/db");
const icon_badge_1 = require("@/components/icon-badge");
const banner_1 = require("@/components/banner");
const lesson_title_form_1 = require("./_components/lesson-title-form");
const lesson_description_form_1 = require("./_components/lesson-description-form");
const lesson_video_form_1 = require("./_components/lesson-video-form");
const lesson_actions_1 = require("./_components/lesson-actions");
const headers_1 = require("next/headers");
const LessonIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const headersList = (0, headers_1.headers)();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";
    const isIntroductionCoursePage = fullUrl === null || fullUrl === void 0 ? void 0 : fullUrl.includes(process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID);
    const lesson = yield db_1.db.lesson.findUnique({
        where: {
            id: params.lessonId,
            chapterId: params.chapterId,
        },
    });
    if (!lesson) {
        return (0, navigation_1.redirect)("/");
    }
    const requiredFields = !isIntroductionCoursePage ? [lesson.title, lesson.description || lesson.videoUrl] : [lesson.videoUrl];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);
    return (<>
      {!lesson.isPublished && (<banner_1.Banner variant="warning" label="هذا الدرس غير منشور لن يكون مرئيا في الدورة"/>)}
      <div className="p-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <link_1.default href={`${isIntroductionCoursePage ? `/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}` : `/teacher/courses/${params.courseId}/chapters/${params.chapterId}`} `} className="flex items-center text-sm hover:opacity-75 transition mb-6">
              <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
              {isIntroductionCoursePage ? "العودة الى التعريف بالموقع" : `              العودة إلى إعداد الفصل
`}
            </link_1.default>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">إنشاء الدرس</h1>
                <span className="text-sm text-slate-700">
                  {isIntroductionCoursePage ? `أكمل كافة الحقول ${completionText} - يجب أن يكون لديك
                      فيديو` : `أكمل كافة الحقول ${completionText} - يجب أن يكون لديك
                    وصف أو فيديو`}
                
                </span>
              </div>
              {!isIntroductionCoursePage &&
            <lesson_actions_1.LessonActions disabled={!isComplete} courseId={params.courseId} chapterId={params.chapterId} lessonId={params.lessonId} isPublished={lesson.isPublished}/>}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {<div className="space-y-4">
              <div>
                {!isIntroductionCoursePage && (<div><div className="flex items-center gap-x-2">

                    <icon_badge_1.IconBadge icon={lucide_react_1.LayoutDashboard}/>
                    <h2 className="text-xl">تخصيص الدرس الخاص بك</h2>
                  </div>
                  <lesson_title_form_1.LessonTitleForm initialData={lesson} courseId={params.courseId} chapterId={params.chapterId} lessonId={params.lessonId}/></div>)}
                
                <lesson_description_form_1.LessonDescriptionForm initialData={lesson} courseId={params.courseId} chapterId={params.chapterId} lessonId={params.lessonId}/>
              </div>
            </div>}
          <div>
            <div className="flex items-center gap-x-2">
              <icon_badge_1.IconBadge icon={lucide_react_1.Video}/>
              <h2 className="text-xl">أضف فيديو</h2>
            </div>
            <lesson_video_form_1.LessonVideoForm initialData={lesson} chapterId={params.chapterId} lessonId={params.lessonId} courseId={params.courseId}/>
          </div>
        </div>
      </div>
    </>);
});
exports.default = LessonIdPage;
