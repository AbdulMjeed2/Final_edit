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
exports.CourseEnrollButton = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const button_1 = require("@/components/ui/button");
const format_1 = require("@/lib/format");
const CourseEnrollButton = ({ price, courseId, }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const onClick = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            const response = yield axios_1.default.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (<button_1.Button onClick={onClick} disabled={isLoading} size="sm" className="w-full md:w-auto">
      التسجيل ل {(0, format_1.formatPrice)(price)}
    </button_1.Button>);
};
exports.CourseEnrollButton = CourseEnrollButton;
