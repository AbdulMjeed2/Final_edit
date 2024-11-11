"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const status_1 = require("@/lib/status");
const nextjs_1 = require("@clerk/nextjs");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const Popup = () => {
    const [popup, setPopup] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const { user } = (0, nextjs_1.useUser)();
    const userFullName = (0, react_1.useMemo)(() => {
        return `${user === null || user === void 0 ? void 0 : user.firstName} ${(user === null || user === void 0 ? void 0 : user.lastName) || ""}`.trim();
    }, [user === null || user === void 0 ? void 0 : user.firstName, user === null || user === void 0 ? void 0 : user.lastName]);
    (0, react_1.useEffect)(() => {
        const res = localStorage.getItem("welcome");
        if (res) {
            setPopup(false);
            dispatch((0, status_1.setClose)());
        }
        else {
            setPopup(true);
            dispatch((0, status_1.setOpen)());
        }
    }, []);
    const handleClick = () => {
        localStorage.setItem("welcome", "true");
        setPopup(false);
    };
    return (<div>
      {popup && (<div className="z-50 w-full">
          <div className="h-[200%] w-full bg-black z-50 opacity-40 visible fixed "></div>
          <div id="static-modal" data-modal-backdrop="static" style={{
                left: "50%",
                top: "50%",
                transform: " translate(-50%, -50%)",
            }} tabIndex={-1} dir="rtl" className="overflow-y-auto overflow-x-hidden z-50 justify-center absolute items-center left-[300px]   md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {userFullName
                ? `اهلا بك ${userFullName !== null && userFullName !== void 0 ? userFullName : user === null || user === void 0 ? void 0 : user.emailAddresses[0].emailAddress}`
                : "اهلا بك"}
                  </h3>
                  <button onClick={handleClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    نتشرف بزيارتك لموقعنا و نتمنى ان يعجبك
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    هناك كورس تعليمي للموقع اذا احسست انك ضائع في الموقع يرجى
                    مشاهدة الكورس
                  </p>
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <link_1.default href={`/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`} data-modal-hide="static-modal" type="Link" className="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    الكورس التعريفي
                  </link_1.default>
                  <button onClick={handleClick} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    تخطي
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.Popup = Popup;
