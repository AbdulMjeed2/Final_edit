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
exports.StarterExamForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const form_1 = require("@/components/ui/form");
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
const input_1 = require("@/components/ui/input");
const textarea_1 = require("@/components/ui/textarea");
const badge_1 = require("@/components/ui/badge");
const react_label_1 = require("@radix-ui/react-label");
const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    starter: z.boolean()
});
const StarterExamForm = ({ initialData, courseId }) => {
    var _a;
    const [isCreating, setIsCreating] = (0, react_1.useState)(false);
    const [isUpdating, setIsUpdating] = (0, react_1.useState)(false);
    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };
    const starterExams = (_a = initialData.exams) === null || _a === void 0 ? void 0 : _a.filter((e) => e.starterExam == true);
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            title: "",
            description: "",
            starter: true
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`/api/courses/${courseId}/exam`, values);
            react_hot_toast_1.default.success("تم إنشاء الامتحان");
            toggleCreating();
            router.refresh();
        }
        catch (error) {
            console.log("====================================");
            console.log(error);
            console.log("====================================");
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    const onEdit = (id) => {
        router.push(`/teacher/courses/${courseId}/exam/${id}`);
    };
    const onDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //  setIsDeleting(true);
            debugger;
            yield axios_1.default.delete(`/api/courses/${courseId}/exam/${id}`);
            //deleted(id)
            react_hot_toast_1.default.success("تم حذف الخيار");
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.success("تم حذف الخيار");
            router.refresh();
        }
        finally {
            //  setIsDeleting(false);
        }
    });
    return (<div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <lucide_react_1.Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
        </div>)}
      <div className="font-medium flex items-center justify-between">
      امتحان الدورة
        {!((starterExams === null || starterExams === void 0 ? void 0 : starterExams.length) > 0) && (<button_1.Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (<>إلغاء</>) : (<>
                <lucide_react_1.PlusCircle className="h-4 w-4 mr-2"/>
                إضافة الامتحان
              </>)}
          </button_1.Button>)}
      </div>
      {isCreating && (<form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <react_label_1.Label>-:عنوان</react_label_1.Label>
            <form_1.FormField control={form.control} name="title" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormControl>
                    
                    <input_1.Input disabled={isSubmitting} placeholder="e.g. 'امتحان تطوير الويب" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <react_label_1.Label className="mt-2">وصف:-</react_label_1.Label>
            <form_1.FormField control={form.control} name="description" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormControl>
                    <textarea_1.Textarea disabled={isSubmitting} placeholder="e.g. '...هذا سيساعدك'" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <button_1.Button disabled={!isValid || isSubmitting} type="submit">
            إنشاء
            </button_1.Button>
          </form>
        </form_1.Form>)}
      {!isCreating && (<div className={(0, utils_1.cn)("text-sm mt-2", !initialData.exams && "text-slate-500 italic")}>
          {starterExams === null || starterExams === void 0 ? void 0 : starterExams.map((exam, index) => {
                return (!exam ? ("لا امتحان") : (<div key={index} className={(0, utils_1.cn)("flex justify-between items-center py-3 pl-3 gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm")}>
                  <div> {exam.title}</div>
                  <div className="ml-auto pr-2 flex items-center gap-x-2">
                    <badge_1.Badge className={(0, utils_1.cn)("bg-slate-500", exam.isPublished && "bg-sky-700")}>
                      {exam.isPublished ? "نشرت" : "مسودة"}
                    </badge_1.Badge>
                    <lucide_react_1.Delete onClick={() => onDelete(exam.id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                    {<lucide_react_1.Pencil onClick={() => onEdit(exam.id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>}
                  </div>
                </div>));
            })}
        </div>)}
    </div>);
};
exports.StarterExamForm = StarterExamForm;
