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
const db_1 = require("@/lib/db");
const taskAttachemet_1 = __importDefault(require("./taskAttachemet"));
const LessonIdPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params, }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    let user = yield server_1.clerkClient.users.getUser(params.studentId);
    const task = yield db_1.db.task.findFirst({
        where: {
            courseId: params.courseId
        }
    });
    const taskAttachemet = yield db_1.db.taskAttachment.findFirst({
        where: {
            userId: params.studentId,
            taskId: task === null || task === void 0 ? void 0 : task.id
        }
    });
    user = JSON.parse(JSON.stringify(user));
    console.log("Task", taskAttachemet);
    console.log("User", user);
    return (<div>
      
      <div className="flex flex-col max-w-4xl mx-auto pb-20 pt-10" dir="rtl">
      <div className="flex ">
              
        </div>
        
          
          
            
              
            <taskAttachemet_1.default attachment={taskAttachemet} user={user}/>           
            
        </div>
        
      </div>);
});
exports.default = LessonIdPage;
