"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCard = void 0;
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const icon_badge_1 = require("@/components/icon-badge");
const course_progress_1 = require("@/components/course-progress");
const CourseCard = ({ id, title, imageUrl, chaptersLength, progress, category, }) => {
    return (<link_1.default href={`/courses/${id}`}>
      <div dir="rtl" className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <image_1.default fill className="object-cover" alt={title} src={imageUrl}/>
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <div className="text-xs text-muted-foreground">{category}</div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <icon_badge_1.IconBadge size="sm" icon={lucide_react_1.BookOpen}/>
              <span>
                {chaptersLength > 2 ? chaptersLength : ''} 
                {chaptersLength === 1 ? "فصل" : ""}
                {chaptersLength === 2 ? " فصلين " : ""}
                {chaptersLength > 2 ? " فصول " : ""}
                {chaptersLength > 10 ? " فصل " : ""}
              </span>
            </div>
          </div>
          {progress !== null && Math.round(progress) > 0 ? (<course_progress_1.CourseProgress variant={progress === 100 ? "success" : "default"} size="sm" value={progress}/>) : (<div className="w-full flex justify-between items-center">
              <div className="font-medium text-sm text-sky-700">ابدأ الدورة</div>
              <lucide_react_1.ArrowRight className="h-4 w-4 mr-2 text-sky-700"/>
            </div>)}
        </div>
      </div>
    </link_1.default>);
};
exports.CourseCard = CourseCard;
