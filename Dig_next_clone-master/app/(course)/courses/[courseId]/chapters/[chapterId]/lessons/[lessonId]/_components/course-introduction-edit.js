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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEditButton = void 0;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const use_confetti_store_1 = require("@/hooks/use-confetti-store");
const CourseEditButton = ({ chapterId, lessonId }) => {
    const router = (0, navigation_1.useRouter)();
    const confetti = (0, use_confetti_store_1.useConfettiStore)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const onClick = () => __awaiter(void 0, void 0, void 0, function* () {
        router.push(`/teacher/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}/chapters/${chapterId}/lessons/${lessonId}`);
    });
    return (<button_1.Button onClick={onClick} disabled={isLoading} type="button" variant={"success"} className="w-full md:w-auto bg-sky-700 hover:bg-sky-600">
      {" تعديل"}
      
    </button_1.Button>);
};
exports.CourseEditButton = CourseEditButton;
