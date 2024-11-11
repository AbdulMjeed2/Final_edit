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
const db_1 = require("@/lib/db");
const icon_badge_1 = require("@/components/icon-badge");
const banner_1 = require("@/components/banner");
const title_form_1 = require("./_components/title-form");
const image_form_1 = require("./_components/image-form");
const category_form_1 = require("./_components/category-form");
const chapters_form_1 = require("./_components/chapters-form");
const actions_1 = require("./_components/actions");
const exam_form_1 = require("./_components/exam-form");
const exam_starter_form_1 = require("./_components/exam-starter-form");
const task_form_1 = require("./_components/task-form");
const CourseIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const course = yield db_1.db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            exams: true,
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    const task = yield db_1.db.task.findFirst({
        where: {
            courseId: params.courseId
        }
    });
    const categories = yield db_1.db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
    if (!course) {
        return (0, navigation_1.redirect)("/");
    }
    const requiredFields = [
        course.title,
        course.imageUrl,
        course.categoryId,
        course.chapters.some((chapter) => chapter.isPublished),
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);
    return (<>
      {!course.isPublished && (<banner_1.Banner label=".هذه الدورة غير منشورة. ولن تكون مرئية للطلاب"/>)}
      <div className="p-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">إعداد الدورة</h1>
            <span className="text-sm text-slate-700">
            أكمل كافة الحقول {completionText}
            </span>
          </div>
          <actions_1.Actions disabled={!isComplete} courseId={params.courseId} isPublished={course.isPublished}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <icon_badge_1.IconBadge icon={lucide_react_1.LayoutDashboard}/>
              <h2 className="text-xl">تخصيص الدورة التدريبية الخاصة بك</h2>
            </div>
            <title_form_1.TitleForm initialData={course} courseId={course.id}/>
            <image_form_1.ImageForm initialData={course} courseId={course.id}/>
            <category_form_1.CategoryForm initialData={course} courseId={course.id} options={categories.map((category) => ({
            label: category.name,
            value: category.id,
        }))}/>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.ListChecks}/>
                <h2 className="text-xl">فصول الدورة</h2>
              </div>
              <chapters_form_1.ChaptersForm initialData={course} courseId={course.id}/>
            </div>
            
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.ShieldQuestion}/>
                <h2 className="text-xl">الاختبار القبلي  </h2>
              </div>
              <exam_starter_form_1.StarterExamForm initialData={course} courseId={course.id}/>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.ShieldQuestion}/>
                <h2 className="text-xl">الاختبار البعدي  </h2>
              </div>
              <exam_form_1.ExamForm initialData={course} courseId={course.id}/>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.ClipboardListIcon}/>
                <h2 className="text-xl"> المهام  </h2>
              </div>
              <task_form_1.TaskForm initialData={task} courseId={course.id}/>
            </div>
          </div>
        </div>
      </div>
    </>);
});
exports.default = CourseIdPage;
