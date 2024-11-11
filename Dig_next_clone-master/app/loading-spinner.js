"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Loading;
const lucide_react_1 = require("lucide-react");
function Loading() {
    return (<div className="absolute top-0 left-0 w-full h-full bg-white/60 flex items-center justify-center">
      <lucide_react_1.Loader2 className="w-10 h-10 animate-spin text-sky-700"/>
    </div>);
}
