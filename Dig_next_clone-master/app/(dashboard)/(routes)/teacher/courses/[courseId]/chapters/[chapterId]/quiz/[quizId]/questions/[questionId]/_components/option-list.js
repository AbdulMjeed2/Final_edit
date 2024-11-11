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
exports.OptionList = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("react");
const dnd_1 = require("@hello-pangea/dnd");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const form_1 = require("@/components/ui/form");
const popover_1 = require("@/components/ui/popover");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const OptionList = ({ answer, items, courseId, quizId, chapterId, questionId, onReorder, }) => {
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    const [isDeleting, setIsDeleting] = (0, react_1.useState)(false);
    const [options, setCurrentOptions] = (0, react_1.useState)(items);
    const [currentOption, setCurrentOption] = (0, react_1.useState)();
    const formSchema = z.object({
        text: z.string().min(1),
    });
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            text: currentOption === null || currentOption === void 0 ? void 0 : currentOption.text,
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const router = (0, navigation_1.useRouter)();
    const onDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsDeleting(true);
            yield axios_1.default.delete(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}/options/${id}`);
            react_hot_toast_1.default.success("تم حذف الخيار");
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setIsDeleting(false);
        }
    });
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}/options/${currentOption === null || currentOption === void 0 ? void 0 : currentOption.id}`, values);
            react_hot_toast_1.default.success("تم تحديث خيار السؤال");
            router.refresh();
        }
        catch (error) {
            console.log("====================================");
            console.log(error);
            console.log("====================================");
            react_hot_toast_1.default.error(error.response.data);
        }
    });
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    (0, react_1.useEffect)(() => {
        setCurrentOptions(items);
    }, [items]);
    const onDragEnd = (result) => {
        if (!result.destination)
            return;
        const items = Array.from(options);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);
        const updatedOptions = items.slice(startIndex, endIndex + 1);
        setCurrentOptions(items);
        const bulkUpdateData = updatedOptions.map((option) => ({
            id: option.id,
            position: items.findIndex((item) => item.id === option.id),
        }));
        onReorder(bulkUpdateData);
    };
    if (!isMounted) {
        return null;
    }
    return (<dnd_1.DragDropContext onDragEnd={onDragEnd}>
      <dnd_1.Droppable droppableId="chapters">
        {(provided) => (<div {...provided.droppableProps} ref={provided.innerRef}>
            {options.map((option, index) => (<dnd_1.Draggable key={option.id} draggableId={option.id} index={index}>
                {(provided) => (<div className={(0, utils_1.cn)("flex items-center bg-sky-100 border-sky-200 text-sky-700 gap-x-2 border rounded-md mb-4 text-sm", parseInt(answer) === index + 1 &&
                        "bg-green-100 border-green-200 text-green-700", isDeleting &&
                        (currentOption === null || currentOption === void 0 ? void 0 : currentOption.id) === option.id &&
                        "bg-red-100 border-red-200 text-red-700 animate-pulse")} ref={provided.innerRef} {...provided.draggableProps}>
                    <div className={(0, utils_1.cn)("px-2 py-3 border-r border-r-sky-200 hover:bg-sky-200 rounded-l-md transition")} {...provided.dragHandleProps}>
                      <lucide_react_1.Grip className="h-5 w-5"/>
                    </div>
                    {option.text}
                    {!isDeleting && (<div className="ml-auto pr-2 flex items-center gap-x-2">
                        <lucide_react_1.Delete onClick={() => {
                            setCurrentOption(option);
                            onDelete(option.id);
                        }} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                        <popover_1.Popover>
                          <popover_1.PopoverTrigger>
                            <lucide_react_1.Pencil onClick={() => setCurrentOption((prev) => option)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                          </popover_1.PopoverTrigger>
                          <popover_1.PopoverContent>
                            <form_1.Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                <form_1.FormField control={form.control} name="text" render={({ field }) => (<form_1.FormItem>
                                      <form_1.FormLabel>نص الخيار</form_1.FormLabel>
                                      <form_1.FormControl>
                                        <input_1.Input disabled={isSubmitting} dir="rtl" defaultValue={option.text} placeholder={option.text} {...field}/>
                                      </form_1.FormControl>
                                      <form_1.FormMessage />
                                    </form_1.FormItem>)}/>

                                <button_1.Button disabled={!isValid || isSubmitting} type="submit">
                                  تحديث
                                </button_1.Button>
                              </form>
                            </form_1.Form>
                          </popover_1.PopoverContent>
                        </popover_1.Popover>
                      </div>)}
                  </div>)}
              </dnd_1.Draggable>))}
            {provided.placeholder}
          </div>)}
      </dnd_1.Droppable>
    </dnd_1.DragDropContext>);
};
exports.OptionList = OptionList;
