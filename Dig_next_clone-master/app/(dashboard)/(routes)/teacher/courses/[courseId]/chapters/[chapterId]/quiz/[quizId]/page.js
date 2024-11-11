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
const quiz_title_form_1 = require("./_components/quiz-title-form");
const quiz_actions_1 = require("./_components/quiz-actions");
const question_form_1 = require("./_components/question-form");
const fa_1 = require("react-icons/fa");
const QuizIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const quiz = yield db_1.db.quiz.findUnique({
        where: {
            id: params.quizId,
            chapterId: params.chapterId,
        },
        include: {
            questions: true,
        },
    });
    if (!quiz) {
        return (0, navigation_1.redirect)("/");
    }
    const requiredFields = [
        quiz.title,
        quiz.questions.some((question) => question.isPublished),
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    const isComplete = requiredFields.every(Boolean);
    return (<>
      {!quiz.isPublished && (<banner_1.Banner variant="warning" label="هذا الاختبار غير منشور. لن يكون مرئيا في الدورة"/>)}
      <div className="p-6" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <link_1.default href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
              <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
              العودة إلى إعداد الفصل
            </link_1.default>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">إنشاء مسابقة</h1>
                <span className="text-sm text-slate-700">
                أكمل كافة الحقول {completionText}
                </span>
              </div>
              <quiz_actions_1.QuizActions disabled={!isComplete} chapterId={params.chapterId} courseId={params.courseId} quizId={params.quizId} isPublished={quiz.isPublished}/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <icon_badge_1.IconBadge icon={lucide_react_1.LayoutDashboard}/>
                <h2 className="text-xl">تخصيص النشاط الخاص بك</h2>
              </div>
              <quiz_title_form_1.QuizTitleForm initialData={quiz} chapterId={params.chapterId} courseId={params.courseId} quizId={params.quizId}/>
              
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <icon_badge_1.IconBadge icon={fa_1.FaQuestion}/>
              <h2 className="text-xl">أضف أسئلة</h2>
            </div>
            <question_form_1.QuestionForm initialData={quiz} quizId={quiz.id} chapterId={params.chapterId} courseId={params.courseId}/>
          </div>
        </div>
      </div>
    </>);
});
exports.default = QuizIdPage;
