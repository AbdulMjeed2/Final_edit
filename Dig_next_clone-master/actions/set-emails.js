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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const process_1 = require("process");
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        pass: process_1.env.SMTP_PASS,
        user: process_1.env.SMTP_USER
    }
});
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, from, subject, body }) {
    return yield transport.sendMail({
        to,
        from,
        subject,
        html: body
    });
});
exports.sendMail = sendMail;
