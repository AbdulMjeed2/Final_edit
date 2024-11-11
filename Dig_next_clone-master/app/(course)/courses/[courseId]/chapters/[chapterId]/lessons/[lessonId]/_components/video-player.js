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
exports.VideoPlayer = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_hot_toast_1 = require("react-hot-toast");
const navigation_1 = require("next/navigation");
const lion_player_1 = require("lion-player");
require("lion-player/dist/lion-skin.min.css");
const utils_1 = require("@/lib/utils");
const use_confetti_store_1 = require("@/hooks/use-confetti-store");
const VideoPlayer = ({ courseId, chapterId, lessonId, completeOnEnd, title, url, }) => {
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const confetti = (0, use_confetti_store_1.useConfettiStore)();
    const onEnd = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (completeOnEnd) {
                yield axios_1.default.put(`/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}/progress`, {
                    isCompleted: true,
                });
                react_hot_toast_1.toast.success("تم تحديث التقدم");
                router.refresh();
                router.push(`/courses/${courseId}`);
            }
        }
        catch (_a) {
            react_hot_toast_1.toast.error("هناك شئ غير صحيح");
        }
    });
    const SOURCES = [
        {
            src: url,
            type: 'application/x-mpegURL',
        }
    ];
    return (<div className="relative aspect-video h-fit w-full">
      
      <div className={(0, utils_1.cn)(!isReady && "")}>
        
        {url && (<lion_player_1.LionPlayer src={url} autoplay="muted" height={450} controls={true} // Show player controls
        />)}
      </div>
    </div>);
};
exports.VideoPlayer = VideoPlayer;
