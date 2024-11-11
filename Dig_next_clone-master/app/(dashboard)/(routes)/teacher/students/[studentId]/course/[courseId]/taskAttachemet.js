"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const TaskTeacherFiles = ({ attachment, user }) => {
    return (<div>

            <div className="flex flex-col max-w-4xl mx-auto pb-20 pt-10" dir="rtl">
                

                <div className="space-y-4">
                            <div className="p-4">

                                    <div>
                                        <img className="w-8 h-8 rounded-full" src={user === null || user === void 0 ? void 0 : user.imageUrl} alt="Jese image"/>
                                        <div className={`  "bg-sky-700/50" : msg.id == replyIs ? "bg-gray-400" : ''} flex flex-col w-[650px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
                                            <div className="flex items-center space-x-2 mb-4 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{`${user === null || user === void 0 ? void 0 : user.firstName} ${(user === null || user === void 0 ? void 0 : user.lastName) ? user.lastName : ""}`}</span>
                                                {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{dateString}</span> */}
                                            </div>
                                            {attachment ? (<a href={attachment === null || attachment === void 0 ? void 0 : attachment.url} target="_blank" key={attachment === null || attachment === void 0 ? void 0 : attachment.id} className="flex space-x-2 items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline">
                                                <lucide_react_1.File />
                                                <div className="line-clamp-1">{attachment === null || attachment === void 0 ? void 0 : attachment.name}</div>
                                            </a>) : "لم يقم باكمال المهمة"}
                                            

                                        </div>
                                    </div>
                               
                            </div>

                </div>

            </div>
        </div>);
};
exports.default = TaskTeacherFiles;
