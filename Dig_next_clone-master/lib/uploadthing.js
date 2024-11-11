"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadDropzone = exports.UploadButton = exports.uploadFiles = exports.useUploadThing = void 0;
const react_1 = require("@uploadthing/react");
_a = (0, react_1.generateReactHelpers)(), exports.useUploadThing = _a.useUploadThing, exports.uploadFiles = _a.uploadFiles;
exports.UploadButton = (0, react_1.generateUploadButton)();
exports.UploadDropzone = (0, react_1.generateUploadDropzone)();
