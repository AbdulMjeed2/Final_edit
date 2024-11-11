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
exports.OptionForm = void 0;
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
const option_list_1 = require("./option-list");
const formSchema = z.object({
    text: z.string().min(1),
});
const OptionForm = ({ initialData, quizId, courseId, questionId, chapterId, }) => {
    const [isCreating, setIsCreating] = (0, react_1.useState)(false);
    const [isUpdating, setIsUpdating] = (0, react_1.useState)(false);
    const [optionToBeEdited, setOptionToBeEdited] = (0, react_1.useState)();
    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };
    const router = (0, navigation_1.useRouter)();
    const hasReachedMaxOptions = initialData.options.length === 4;
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            text: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.post(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}/options`, values);
            react_hot_toast_1.default.success("تم إنشاء خيار السؤال");
            toggleCreating();
            form.setValue("text", "");
            router.refresh();
        }
        catch (error) {
            console.log("====================================");
            console.log(error);
            console.log("====================================");
            react_hot_toast_1.default.error(error.response.data);
        }
    });
    const onReorder = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsUpdating(true);
            yield axios_1.default.put(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}/options/reorder`, {
                list: updateData,
            });
            react_hot_toast_1.default.success("تمت إعادة ترتيب خيارات الأسئلة");
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setIsUpdating(false);
        }
    });
    const onEdit = (option) => {
        setOptionToBeEdited(option);
        // router.push(`/teacher/courses/${courseId}/exam/${quizId}/questions/${id}`);
    };
    return (<div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <lucide_react_1.Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
        </div>)}
      <div className="font-medium flex items-center justify-between">
        <div>
          <div> خيارات السؤال</div>
          <div className="text-xs font-semibold">الحد الأدنى 2 والحد الأقصى 4</div>
        </div>
        <button_1.Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (<>إلغاء</>) : hasReachedMaxOptions ? null : (<>
              <lucide_react_1.PlusCircle className="h-4 w-4 mr-2"/>
              إضافة خيار
            </>)}
        </button_1.Button>
      </div>
      {isCreating && (<form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <form_1.FormField control={form.control} name="text" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>نص الخيار</form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input disabled={isSubmitting} placeholder="e.g. '...ما هو'" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>

            <button_1.Button disabled={!isValid || isSubmitting} type="submit">
              إنشاء
            </button_1.Button>
          </form>
        </form_1.Form>)}
      {!isCreating && (<div className={(0, utils_1.cn)("text-sm mt-2", !initialData.options.length && "text-slate-500 italic")}>
          {!initialData.options.length && "لا يوجد خيارات"}
          <option_list_1.OptionList answer={initialData.answer} courseId={courseId} chapterId={chapterId} quizId={quizId} questionId={questionId} onReorder={onReorder} items={initialData.options || []}/>
        </div>)}
      {!isCreating && (<div className="text-xs text-muted-foreground mt-4">
          قم بالسحب والإسقاط لإعادة ترتيب الخيارات
        </div>)}
    </div>);
};
exports.OptionForm = OptionForm;
