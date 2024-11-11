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
const banner_1 = require("@/components/banner");
const separator_1 = require("@/components/ui/separator");
const task_form_1 = require("./_components/task-form");
const db_1 = require("@/lib/db");
const task_file_form_1 = require("./_components/task-file-form");
const teacher_1 = require("@/lib/teacher");
const task_files_teacher_1 = __importDefault(require("./_components/task-files-teacher"));
const task_complete_button_1 = require("./_components/task-complete-button");
const LessonIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const task = yield db_1.db.task.findUnique({ where: { id: params.taskId } });
    const attachmentTask = yield db_1.db.taskAttachment.findFirst({
        where: {
            taskId: params.taskId,
            userId: userId
        }
    });
    if (!task) {
        return (0, navigation_1.redirect)("/");
    }
    const taskProgress = yield db_1.db.userProgress.findFirst({ where: { lessonId: params.taskId, userId: userId } });
    const completeOnEnd = taskProgress === null || taskProgress === void 0 ? void 0 : taskProgress.isCompleted;
    console.log(taskProgress);
    const startedAt = Date.now();
    return (<div>
      {completeOnEnd && (<banner_1.Banner variant="success" label=".لقد أكملت هذه المهمة بالفعل"/>)}
      <div className="flex flex-col max-w-4xl mx-auto pb-20 pt-10" dir="rtl">
      <div className="flex ">
              
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold">{task === null || task === void 0 ? void 0 : task.title}</h2>
              <task_complete_button_1.TaskCompeleteButton taskId={task.id} isCompleted={taskProgress === null || taskProgress === void 0 ? void 0 : taskProgress.isCompleted} courseId={params.courseId}/>
          </div>
        <div className="space-y-4">
          
          <separator_1.Separator />
          
            <div dir="rtl">
              <task_form_1.TaskForm defaultContext={task === null || task === void 0 ? void 0 : task.content}/>
            </div>
              
           {(0, teacher_1.isTeacher)(userId) ? (<task_files_teacher_1.default taskId={params.taskId} courseId={params.courseId}/>) : (<task_file_form_1.TaskFileForm taskId={params.taskId} courseId={params.courseId} attachment={attachmentTask}/>)}
            
        </div>
        
      </div>
    </div>);
});
exports.default = LessonIdPage;
