"use strict";
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
const db_1 = require("@/lib/db");
const teacher_1 = require("@/lib/teacher");
const server_1 = require("@clerk/nextjs/server");
const PrivacyForm_1 = require("./_components/PrivacyForm");
const Privacy = () => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, server_1.auth)();
    const context = yield db_1.db.policiesText.findFirst();
    return (<div dir="rtl">
            <PrivacyForm_1.PrivacyForm defaultContext={context === null || context === void 0 ? void 0 : context.context} isTeacher={(0, teacher_1.isTeacher)(userId)}/>
        </div>);
});
exports.default = Privacy;
