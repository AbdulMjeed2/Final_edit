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
exports.htmlToPdf = htmlToPdf;
const jspdf_1 = __importDefault(require("jspdf"));
const html2canvas_1 = __importDefault(require("html2canvas"));
function htmlToPdf(htmlElement) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = document.getElementById(htmlElement.id);
        if (!input) {
            throw new Error("HTML element not found");
        }
        // input.style.height = "794px";
        // input.style.width = "1123px";
        return new Promise((resolve, reject) => {
            (0, html2canvas_1.default)(input, { scale: 2 })
                .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jspdf_1.default({
                    orientation: "landscape",
                    unit: "mm",
                    format: [297, 180],
                });
                pdf.addImage(imgData, "PNG", 0, 0, 297, 180);
                resolve(pdf.output("blob"));
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
