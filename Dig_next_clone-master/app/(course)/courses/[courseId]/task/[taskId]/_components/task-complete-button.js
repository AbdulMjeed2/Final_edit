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
exports.TaskCompeleteButton = void 0;
const axios_1 = __importDefault(require("axios"));
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const button_1 = require("@/components/ui/button");
const TaskCompeleteButton = ({ courseId, taskId, isCompleted, }) => {
    const router = (0, navigation_1.useRouter)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const onClick = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            yield axios_1.default.patch(`/api/courses/${courseId}/task/${taskId}/progress`, {
                isCompleted: !isCompleted,
            });
            react_hot_toast_1.default.success("تم تحديث التقدم");
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setIsLoading(false);
        }
    });
    const Icon = isCompleted ? lucide_react_1.XCircle : lucide_react_1.CheckCircle;
    return (<button_1.Button onClick={onClick} disabled={isLoading} type="button" variant={isCompleted ? "outline" : "success"} className="w-full md:w-auto bg-sky-700 hover:bg-sky-600">
      {isCompleted ? "غير مكتمل" : "وضع علامة كمكتملة"}
      <Icon className="h-4 w-4 mr-2"/>
    </button_1.Button>);
};
exports.TaskCompeleteButton = TaskCompeleteButton;
