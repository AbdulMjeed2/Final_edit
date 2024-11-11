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
const lucide_react_1 = require("lucide-react");
const get_chapter_1 = require("@/actions/get-chapter");
const banner_1 = require("@/components/banner");
const separator_1 = require("@/components/ui/separator");
const video_player_1 = require("./_components/video-player");
const course_progress_button_1 = require("./_components/course-progress-button");
const course_introduction_edit_1 = require("./_components/course-introduction-edit");
const teacher_1 = require("@/lib/teacher");
const course_form_1 = require("./_components/course-form");
const help_box_1 = require("./_components/help-box");
const LessonIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const { lesson, chapter, course, attachments, userProgress, } = yield (0, get_chapter_1.getChapter)({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        lessonId: params.lessonId,
    });
    if (!chapter || !course || !lesson) {
        return (0, navigation_1.redirect)("/");
    }
    const isInroductionCourse = process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID === course.id;
    const completeOnEnd = !(userProgress === null || userProgress === void 0 ? void 0 : userProgress.isCompleted);
    const startedAt = Date.now();
    return (<div>
      <help_box_1.HelpBox />
      {(userProgress === null || userProgress === void 0 ? void 0 : userProgress.isCompleted) && (<banner_1.Banner variant="success" label=".لقد أكملت هذا الدرس بالفعل"/>)}

      <div className="flex flex-col max-w-4xl mx-auto pb-20 pt-10" dir="rtl">
      <div className="flex ">
              
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold">{lesson.title}</h2>
            {isInroductionCourse ? (0, teacher_1.isTeacher)(userId) ? <course_introduction_edit_1.CourseEditButton chapterId={params.chapterId} lessonId={params.lessonId}/> : "" : (<course_progress_button_1.CourseProgressButton lessonId={params.lessonId} chapterId={params.chapterId} courseId={params.courseId} isCompleted={!!(userProgress === null || userProgress === void 0 ? void 0 : userProgress.isCompleted)} userId={userId} startedAt={startedAt}/>)}
          </div>
        <div className="space-y-4">
          
          <separator_1.Separator />
          
            <div dir="rtl">
              <course_form_1.CourseForm defaultContext={lesson.description}/>
            </div>
              
            
          
          {!!attachments.length && (<>
              <separator_1.Separator />
              <div className="p-4">
                {attachments.map((attachment) => (<a href={attachment.url} target="_blank" key={attachment.id} className="flex space-x-2 items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline">
                    <lucide_react_1.File />
                    <div className="line-clamp-1">{attachment.name}</div>
                  </a>))}
              </div>
            </>)}
        </div>
        {lesson.videoUrl && (<div className="p-4">
            <video_player_1.VideoPlayer chapterId={params.chapterId} title={chapter.title} lessonId={lesson.id} courseId={params.courseId} completeOnEnd={completeOnEnd} url={lesson.videoUrl}/>
          </div>)}
      </div>
    </div>);
});
exports.default = LessonIdPage;
