"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const uploadthing_1 = require("@/lib/uploadthing");
const react_1 = require("react");
const FileUpload = ({ onChange, endpoint }) => {
    const [file, setFile] = (0, react_1.useState)();
    const sizeToMeabytes = (size) => {
        return `${(size / 1048576).toFixed(2)} MB`;
    };
    return (<uploadthing_1.UploadDropzone endpoint={endpoint} content={{
            allowedContent({ isUploading }) {
                if (isUploading)
                    return `Uploading ${file === null || file === void 0 ? void 0 : file.name} - ${(file === null || file === void 0 ? void 0 : file.size) ? sizeToMeabytes(file === null || file === void 0 ? void 0 : file.size) : ""}`;
            },
        }} onClientUploadComplete={(res) => {
            onChange(res === null || res === void 0 ? void 0 : res[0].url);
        }} onUploadError={(error) => {
            react_hot_toast_1.default.error(`${error === null || error === void 0 ? void 0 : error.message}`);
        }} onBeforeUploadBegin={(files) => {
            if (files)
                setFile(files[0]);
            return files;
        }}/>);
};
exports.FileUpload = FileUpload;
