"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsEditButton = void 0;
const button_1 = require("@/components/ui/button");
const GoalsEditButton = () => {
    return (<button_1.Button type="button" variant={"success"} className="w-full md:w-auto bg-sky-700 hover:bg-sky-600">
      {" تعديل"}
    </button_1.Button>);
};
exports.GoalsEditButton = GoalsEditButton;
