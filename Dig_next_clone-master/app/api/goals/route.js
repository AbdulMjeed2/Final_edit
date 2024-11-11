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
exports.PATCH = PATCH;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
const teacher_1 = require("@/lib/teacher");
function PATCH(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            const { context } = yield req.json();
            if (!userId || !(0, teacher_1.isTeacher)(userId)) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const contextDb = yield db_1.db.goalsText.findFirst();
            if (contextDb) {
                const newContext = yield db_1.db.goalsText.update({
                    where: {
                        id: contextDb.id
                    },
                    data: {
                        context: context.replace(`<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>`, "")
                    }
                });
            }
            else {
                const newContext = yield db_1.db.goalsText.create({ data: { context: context } });
            }
            return server_2.NextResponse.json(context);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
