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
exports.CategoryForm = void 0;
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
const combobox_1 = require("@/components/ui/combobox");
const formSchema = z.object({
    categoryId: z.string().min(1),
});
const CategoryForm = ({ initialData, courseId, options, }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            categoryId: (initialData === null || initialData === void 0 ? void 0 : initialData.categoryId) || "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`/api/courses/${courseId}`, values);
            react_hot_toast_1.default.success("تم تحديث الدورة");
            toggleEdit();
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    const selectedOption = options.find((option) => option.value === initialData.categoryId);
    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
      فئة الدورة
        <button_1.Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (<>إلغاء</>) : (<>
              <lucide_react_1.Pencil className="h-4 w-4 mr-2"/>
              تحرير الفئة
            </>)}
        </button_1.Button>
      </div>
      {!isEditing && (<div className={(0, utils_1.cn)("text-sm mt-2", !initialData.categoryId && "text-slate-500 italic")}>
          {(selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.label) || "لا تصنيف"}
        </div>)}
      {isEditing && (<form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <form_1.FormField control={form.control} name="categoryId" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormControl>
                    <combobox_1.Combobox options={options} {...field}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <div className="flex items-center gap-x-2">
              <button_1.Button disabled={!isValid || isSubmitting} type="submit">
              حفظ
              </button_1.Button>
            </div>
          </form>
        </form_1.Form>)}
    </div>);
};
exports.CategoryForm = CategoryForm;
