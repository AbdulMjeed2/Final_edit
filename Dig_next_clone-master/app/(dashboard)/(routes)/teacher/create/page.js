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
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const form_1 = require("@/components/ui/form");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});
const CreatePage = () => {
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            title: ""
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            react_hot_toast_1.default.success("تم إنشاء الدورة");
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    return (<div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full div-6">
      <div>
        <h1 className="text-2xl">
          قم بتسمية الدورة التدريبية الخاصة بك
        </h1>
        <div className="text-sm text-slate-600">
        ماذا تريد أن تسمي الدورة الخاصة بك؟ لا تقلق 
        .يمكنك تغيير هذا لاحقا
        </div>
        <form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <form_1.FormField control={form.control} name="title" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormLabel>
                  عنوان الدورة
                  </form_1.FormLabel>
                  <form_1.FormControl>
                    <input_1.Input disabled={isSubmitting} placeholder="e.g. 'تطوير الويب المتقدم'" {...field}/>
                  </form_1.FormControl>
                  <form_1.FormDescription>
                  ماذا ستدرس في هذه الدورة؟
                  </form_1.FormDescription>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <div className="flex items-center gap-x-2">
              <link_1.default href="/">
                <button_1.Button type="button" variant="ghost">
                  الغاء
                </button_1.Button>
              </link_1.default>
              <button_1.Button type="submit" disabled={!isValid || isSubmitting}>
                إنشاء
              </button_1.Button>
            </div>
          </form>
        </form_1.Form>
      </div>
    </div>);
};
exports.default = CreatePage;
