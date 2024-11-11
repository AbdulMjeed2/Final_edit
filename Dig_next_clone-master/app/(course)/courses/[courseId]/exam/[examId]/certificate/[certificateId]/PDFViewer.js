"use strict";
"use client";
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
exports.PdfViewer = void 0;
const react_1 = require("react");
const html_to_pdf_1 = require("@/lib/html-to-pdf");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const nextjs_1 = require("@clerk/nextjs");
const navigation_1 = require("next/navigation");
const axios_1 = __importDefault(require("axios"));
const pdf_lib_1 = require("pdf-lib");
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
require("react-pdf/dist/Page/TextLayer.css");
const Viewer_1 = __importDefault(require("./Viewer"));
const PdfViewer = ({ params, }) => {
    const htmlRef = (0, react_1.useRef)(null);
    const [certificatePdf, setCertificatePdf] = (0, react_1.useState)("");
    const { userId } = (0, nextjs_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const [certificate, setCertificate] = (0, react_1.useState)();
    const [isGettingCertificate, setisGettingCertificate] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            setisGettingCertificate(true);
            const url = "https://uz635cwohid0t4ce.public.blob.vercel-storage.com/Appreciation%20Certificate%20%D8%B4%D9%87%D8%A7%D8%AF%D8%A9%20%D8%AA%D9%82%D8%AF%D9%8A%D8%B1%20%D8%A3%D8%B2%D8%B1%D9%82%20%D9%88%D8%A3%D8%AE%D8%B6%D8%B1%20(2)-4GF2H0oU8fk7pv6dP4xuqGw4mVJUJE.pdf";
            const existingPdfBytes = yield fetch(url).then((res) => res.arrayBuffer());
            const pdfDoc = yield pdf_lib_1.PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            try {
                const response = yield axios_1.default.get(`/api/courses/${params.courseId}/exam//${params.examId}/certificate/${params.certificateId}`);
                const fontUrl = "https://uz635cwohid0t4ce.public.blob.vercel-storage.com/Cairo-Regular-IfPEScEah1exU4X87UiQ3sPhWk8hQ6.ttf";
                pdfDoc.registerFontkit(fontkit_1.default);
                const fontBytes = yield fetch(fontUrl).then((res) => res.arrayBuffer());
                const customFont = yield pdfDoc.embedFont(fontBytes);
                const textSize = 35;
                const date = new Date(response.data.dateOfIssuance);
                firstPage.drawText(response.data.nameOfStudent, {
                    x: 400,
                    y: 285,
                    size: textSize,
                    font: customFont,
                    color: (0, pdf_lib_1.rgb)(0, 0.53, 0.71),
                });
                firstPage.drawText(response.data.courseTitle, {
                    x: 400,
                    y: 150,
                    size: textSize,
                    font: customFont,
                    color: (0, pdf_lib_1.rgb)(0, 0.53, 0.71),
                });
                firstPage.drawText(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, {
                    x: 100,
                    y: 72,
                    size: 20,
                    font: customFont,
                    color: (0, pdf_lib_1.rgb)(0, 0.53, 0.71),
                });
                const pdfBytes = yield pdfDoc.save();
                const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setCertificatePdf(pdfUrl);
                setCertificate(response.data);
                if (!response.data) {
                    (0, navigation_1.redirect)(`/courses/${params.courseId}`);
                }
                return router.refresh();
            }
            catch (error) {
                react_hot_toast_1.default.error("هناك شئ غير صحيح");
            }
            finally {
                setisGettingCertificate(false);
            }
        }))();
    }, [params.certificateId, params.courseId, params.examId]);
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const handleDownload = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!htmlRef.current) {
            react_hot_toast_1.default.error("لا المرجع");
            return;
        }
        try {
            const pdfBlob = yield (0, html_to_pdf_1.htmlToPdf)(htmlRef.current);
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "certificate.pdf");
            link.click();
        }
        catch (error) {
            console.error(error);
        }
    });
    return (<>
      {isGettingCertificate ? (<div className="flex items-center justify-center h-full w-full">
          <div className="font-bold text-2xl text-slate-500 animate-pulse">
            ...تحضير شهادتك
          </div>
        </div>) : certificate ? (<div className="flex flex-col space-y-8 ml-10 pb-8 mt-8 mr-8">
          <button className="self-end rounded-lg text-white font-bold bg-sky-600 max-w-fit py-2 px-3" onClick={handleDownload}>
            <div> تحميل PDF</div>
          </button>
          <Viewer_1.default fileUrl={certificatePdf}/>
        </div>) : null}
    </>);
};
exports.PdfViewer = PdfViewer;
exports.default = exports.PdfViewer;
