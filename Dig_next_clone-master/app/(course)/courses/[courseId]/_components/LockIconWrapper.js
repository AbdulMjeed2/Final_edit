"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// LockIconWrapper.tsx
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const LockIconWrapper = ({ className, size = 22 }) => (<lucide_react_1.LockIcon size={size} className={(0, utils_1.cn)("min-w-[22px] min-h-[22px]", className)}/>);
exports.default = LockIconWrapper;
