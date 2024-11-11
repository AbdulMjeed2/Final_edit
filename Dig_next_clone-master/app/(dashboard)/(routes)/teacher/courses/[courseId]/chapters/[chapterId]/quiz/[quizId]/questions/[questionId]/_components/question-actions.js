"use strict";
"use client";
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
exports.QuestionActions = void 0;
const axios_1 = __importDefault(require("axios"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const confirm_modal_1 = require("@/components/modals/confirm-modal");
const QuestionActions = ({ disabled, courseId, quizId, questionId, isPublished, chapterId, }) => {
    const router = (0, navigation_1.useRouter)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const onClick = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            if (isPublished) {
                yield axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}/unpublish`);
                react_hot_toast_1.default.success("سؤال غير منشور");
            }
            else {
                yield axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}/publish`);
                react_hot_toast_1.default.success("تم نشر السؤال");
            }
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setIsLoading(false);
        }
    });
    const onDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            yield axios_1.default.delete(`/api/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}/questions/${questionId}`);
            react_hot_toast_1.default.success("تم حذف السؤال");
            router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/quiz/${quizId}`);
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (<div className="flex items-center gap-x-2">
      <button_1.Button onClick={onClick} disabled={disabled || isLoading} variant="outline" size="sm">
        {isPublished ? "إلغاء النشر" : "نشر"}
      </button_1.Button>
      <confirm_modal_1.ConfirmModal onConfirm={onDelete}>
        <button_1.Button size="sm" disabled={isLoading}>
          <lucide_react_1.Trash className="h-4 w-4"/>
        </button_1.Button>
      </confirm_modal_1.ConfirmModal>
    </div>);
};
exports.QuestionActions = QuestionActions;
