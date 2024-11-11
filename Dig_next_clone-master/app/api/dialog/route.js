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
exports.GET = GET;
exports.POST = POST;
const server_1 = require("@clerk/nextjs/server");
const server_2 = require("next/server");
const db_1 = require("@/lib/db");
function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const dialogStatus = yield db_1.db.assistPages.findFirst({
                where: {
                    userId
                }
            });
            return server_2.NextResponse.json(dialogStatus);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = (0, server_1.auth)();
            const { object } = yield req.json();
            console.log(object);
            if (!userId) {
                return new server_2.NextResponse("Unauthorized", { status: 401 });
            }
            const dialogPrev = yield db_1.db.assistPages.findFirst({ where: { userId } });
            if (dialogPrev) {
                const dialogNew = yield db_1.db.assistPages.update({
                    where: {
                        id: dialogPrev.id
                    },
                    data: Object.assign({}, object)
                });
            }
            else {
                const dialogStatus = yield db_1.db.assistPages.create({
                    data: Object.assign({ userId }, object)
                });
            }
            return server_2.NextResponse.json(dialogPrev);
        }
        catch (error) {
            console.log("[COURSES]", error);
            return new server_2.NextResponse("Internal Error", { status: 500 });
        }
    });
}
