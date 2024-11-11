"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconBadge = void 0;
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("@/lib/utils");
const backgroundVariants = (0, class_variance_authority_1.cva)("rounded-full flex items-center justify-center", {
    variants: {
        variant: {
            default: "bg-sky-100",
            success: "bg-emerald-100",
        },
        size: {
            default: "p-2",
            sm: "p-1",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
});
const iconVariants = (0, class_variance_authority_1.cva)("", {
    variants: {
        variant: {
            default: "text-sky-700",
            success: "text-emerald-700",
        },
        size: {
            default: "h-8 w-8",
            sm: "h-4 w-4"
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
});
;
const IconBadge = ({ icon: Icon, variant, size, }) => {
    return (<div className={(0, utils_1.cn)(backgroundVariants({ variant, size }))}>
      <Icon className={(0, utils_1.cn)(iconVariants({ variant, size }))}/>
    </div>);
};
exports.IconBadge = IconBadge;
