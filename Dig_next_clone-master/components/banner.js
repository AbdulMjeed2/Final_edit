"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const lucide_react_1 = require("lucide-react");
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("@/lib/utils");
const bannerVariants = (0, class_variance_authority_1.cva)("border text-center p-4 text-sm flex items-center w-full", {
    variants: {
        variant: {
            warning: "bg-yellow-200/80 border-yellow-30 text-primary",
            success: "bg-sky-700 border-emerald-800 text-secondary",
        }
    },
    defaultVariants: {
        variant: "warning",
    }
});
;
const iconMap = {
    warning: lucide_react_1.AlertTriangle,
    success: lucide_react_1.CheckCircleIcon,
};
const Banner = ({ label, variant, }) => {
    const Icon = iconMap[variant || "warning"];
    return (<div className={(0, utils_1.cn)(bannerVariants({ variant }))} dir="rtl">
      <Icon className="h-4 w-4 mr-2"/>
      {label}
    </div>);
};
exports.Banner = Banner;
