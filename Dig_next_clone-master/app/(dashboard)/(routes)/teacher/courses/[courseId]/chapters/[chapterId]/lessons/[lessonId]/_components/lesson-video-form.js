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
exports.LessonVideoForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const file_upload_1 = require("@/components/file-upload");
const react_player_1 = __importDefault(require("react-player"));
const formSchema = z.object({
    videoUrl: z.string().min(1),
});
const LessonVideoForm = ({ initialData, courseId, chapterId, lessonId, }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = (0, navigation_1.useRouter)();
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`, values);
            react_hot_toast_1.default.success("تم تحديث الدرس");
            toggleEdit();
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    return (<div className="mt-6 border bg-slate-100 max-h-full rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      فيديو الدرس
        <button_1.Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>إلغاء</>}
          {!isEditing && !initialData.videoUrl && (<>
              <lucide_react_1.PlusCircle className="h-4 w-4 mr-2"/>
              أضف فيديو
            </>)}
          {!isEditing && initialData.videoUrl && (<>
              <lucide_react_1.Pencil className="h-4 w-4 mr-2"/>
              تحرير الفيديو
            </>)}
        </button_1.Button>
      </div>
      {!isEditing &&
            (!initialData.videoUrl ? (<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <lucide_react_1.Video className="h-10 w-10 text-slate-500"/>
          </div>) : (<div className="relative aspect-video mt-2">
            <react_player_1.default height={"100%"} width={"100%"} className="h-full" url={initialData.videoUrl} playing={false} controls={true}/>
          </div>))}
      {isEditing && (<div>
          <file_upload_1.FileUpload endpoint="lessonVideo" onChange={(url) => {
                if (url) {
                    onSubmit({ videoUrl: url });
                }
            }}/>

          <div className="text-xs text-muted-foreground mt-4">
          قم بتحميل فيديو هذا الدرس
          </div>
        </div>)}
      {initialData.videoUrl && !isEditing && (<div className="text-xs text-muted-foreground mt-2">
          يمكن أن تستغرق معالجة مقاطع الفيديو بضع دقائق. قم بتحديث الصفحة إذا كان الفيديو
          لا تظهر.
        </div>)}
    </div>);
};
exports.LessonVideoForm = LessonVideoForm;
