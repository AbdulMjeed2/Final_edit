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
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const TaskTeacherFiles = ({ taskId, courseId }) => {
    const [attachments, setAttachments] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        function getAttachments() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { data } = yield axios_1.default.get(`/api/courses/${courseId}/task/${taskId}`);
                    setAttachments(data);
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        getAttachments();
    }, []);
    return (<div>

            <div className="flex flex-col max-w-4xl mx-auto pb-20 pt-10" dir="rtl">
                <div className="flex ">

                </div>

                <div className="space-y-4">


                    {attachments.length > 0 && (<>
                            <div className="p-4">
                                {attachments.map(({ attachment, user }, index) => (<div key={index}>
                                        <img className="w-8 h-8 rounded-full" src={user.imageUrl} alt="Jese image"/>
                                        <div className={`  "bg-sky-700/50" : msg.id == replyIs ? "bg-gray-400" : ''} flex flex-col w-[650px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
                                            <div className="flex items-center space-x-2 mb-4 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{`${user.firstName} ${user.lastName ? user.lastName : ""}`}</span>
                                                {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{dateString}</span> */}
                                            </div>
                                            <a href={attachment === null || attachment === void 0 ? void 0 : attachment.url} target="_blank" key={attachment === null || attachment === void 0 ? void 0 : attachment.id} className="flex space-x-2 items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline">
                                                <lucide_react_1.File />
                                                <div className="line-clamp-1">{attachment === null || attachment === void 0 ? void 0 : attachment.name}</div>
                                            </a>

                                        </div>
                                    </div>))}
                            </div>
                        </>)}
                </div>

            </div>
        </div>);
};
exports.default = TaskTeacherFiles;
