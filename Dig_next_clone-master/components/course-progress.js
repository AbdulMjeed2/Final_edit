"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseProgress = void 0;
const progress_1 = require("@/components/ui/progress");
const utils_1 = require("@/lib/utils");
;
const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
};
const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs",
};
const CourseProgress = ({ value, variant, size, }) => {
    return (<div>
      <progress_1.Progress className="h-2" value={value} variant={variant} style={{ transform: "rotateY(180deg)" }}/>
      <div className={(0, utils_1.cn)("font-medium mt-2 text-sky-700", sizeByVariant[size || "default"])}>
        {Math.round(value)}% مكتمل
      </div>
    </div>);
};
exports.CourseProgress = CourseProgress;
