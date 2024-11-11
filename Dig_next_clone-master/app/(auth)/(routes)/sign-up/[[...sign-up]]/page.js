"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
const nextjs_1 = require("@clerk/nextjs");
function Page() {
    return <nextjs_1.SignUp forceRedirectUrl={`/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`}/>;
}
