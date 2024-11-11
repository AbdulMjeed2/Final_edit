"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
require("react-quill/dist/quill.snow.css");
const Editor = ({ onChange, value }) => {
    const ReactQuill = (0, react_1.useMemo)(() => (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require("react-quill"))), { ssr: false }), []);
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            [{ direction: "rtl", default: true }],
            ["link", "image"], // this is rtl support
        ],
    };
    const formats = [
        "header",
        "font",
        "background",
        "color",
        "code",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "script",
        "align",
        "direction",
        "link",
        "image",
        "code-block",
        "formula",
    ];
    return (<div className="bg-white">
      <ReactQuill className="text-right" theme="snow" value={value} onChange={onChange} modules={modules} formats={formats}/>
    </div>);
};
exports.Editor = Editor;
