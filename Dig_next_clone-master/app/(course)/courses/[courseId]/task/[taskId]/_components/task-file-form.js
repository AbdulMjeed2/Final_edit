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
exports.TaskFileForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const file_upload_1 = require("@/components/file-upload");
;
const formSchema = z.object({
    url: z.string().min(1),
});
const TaskFileForm = ({ attachment, courseId, taskId }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [deletingId, setDeletingId] = (0, react_1.useState)(null);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = (0, navigation_1.useRouter)();
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.post(`/api/courses/${courseId}/task/${taskId}/attachment`, values);
            react_hot_toast_1.default.success("تم رفع الملف");
            toggleEdit();
            router.refresh();
        }
        catch (e) {
            console.log(e);
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    const onDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setDeletingId(id);
            yield axios_1.default.delete(`/api/courses/${courseId}/task/${taskId}/attachment/${id}`);
            react_hot_toast_1.default.success("تم حذف المرفق");
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setDeletingId(null);
        }
    });
    return (<div className="mt-6 border bg-slate-100 px-28 rounded-md py-4">
      
      
      
      {attachment ? (<div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
          <lucide_react_1.File className="h-4 w-4 mr-2 flex-shrink-0"/>
          <div className="text-xs line-clamp-1">
            {attachment.name}
          </div>
          {deletingId === attachment.id && (<div>
              <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
            </div>)}
          {deletingId !== attachment.id && (<button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
              <lucide_react_1.X className="h-4 w-4"/>
            </button>)}
        </div>) : (<div>
          <file_upload_1.FileUpload endpoint="taskAttachment" onChange={(url) => {
                if (url) {
                    onSubmit({ url: url });
                }
            }}/>
          
        </div>)}
        
      
    </div>);
};
exports.TaskFileForm = TaskFileForm;
