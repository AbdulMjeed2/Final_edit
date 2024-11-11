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
const convertTime_1 = require("@/lib/convertTime");
const nextjs_1 = require("@clerk/nextjs");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const ReplyCardOwner = ({ msg, user }) => {
    const { userId } = (0, nextjs_1.useAuth)();
    const [isPopup, setIsPopup] = (0, react_1.useState)(false);
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsPopup(false);
        try {
            const { data } = yield axios_1.default.delete(`/api/messages/${msg.id}`);
            react_hot_toast_1.default.success("تم حذف الرسالة");
        }
        catch (e) {
            console.log(e);
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    const today = new Date();
    const date = new Date(msg.createdAt);
    const isToday = today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear() ? true : false;
    const dayString = isToday ? "" : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`}`;
    const timePM = (0, convertTime_1.tConvert)(`${date.getHours() > 10 ? date.getHours() : `0` + date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`}`);
    const dateString = `${dayString} ${isToday ? "" : "-"}  ${timePM}`;
    return (<div className={`relative flex items-start gap-2.5  mb-4`} dir='rtl'>
   <img className="w-8 h-8 rounded-full" src={user.imageUrl} alt="Jese image"/>
   <div className={`  ${userId == user.id ? "bg-sky-700/50" : ''} flex flex-col w-[650px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700`}>
      <div id={msg.id} className="flex items-center space-x-2 rtl:space-x-reverse">
         <span className="text-sm font-semibold text-gray-900 dark:text-white">{`${user.firstName} ${user.lastName ? user.lastName : ""}`}</span>
         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{dateString}</span>
      </div>
      <p className="text-base font-medium py-2.5 text-gray-900 dark:text-white">{msg === null || msg === void 0 ? void 0 : msg.context}</p>
      
   </div>
   {/* {
           (userId == user.id || isTeacher(userId)) && (<button onClick={e => setIsPopup(!isPopup)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                 <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
              </svg>
           </button>)
        } */}
   
   {/* {
           isPopup && (<div id="dropdownDots" className="absolute -left-40 z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
              
              <li>
                 <a onClick={handleDelete} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">حذف</a>
              </li>
              <li>
                 <a onClick={e => {setReplyIs(msg.id);setIsPopup(false)}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">رد</a>
              </li>
           </ul>
        </div>)
        } */}
  
   
    </div>);
};
exports.default = ReplyCardOwner;
