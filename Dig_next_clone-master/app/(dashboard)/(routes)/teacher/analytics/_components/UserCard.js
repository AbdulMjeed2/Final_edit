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
const loading_spinner_1 = __importDefault(require("@/app/loading-spinner"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const UserCard = () => {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            const res = yield fetch("/api/users");
            const resData = yield res.json();
            console.log(resData);
            setUsers(resData === null || resData === void 0 ? void 0 : resData.data);
            setLoading(false);
        });
        fetchUsers();
    }, []);
    return (<div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4 ">
        <h5 className="text-xl w-full font-bold leading-none text-gray-600 dark:text-white text-center">
          تقرير المتدربين
        </h5>
      </div>
      <div className="flow-root">
        <table className="w-full divide-y relative divide-gray-200 dark:divide-gray-700">
          <tr className="w-full ">
            <td className="text-center"></td>
            <td className="text-center">الكورسات المكتملة</td>
            <td className="text-center"></td>
          </tr>
          {users === null || users === void 0 ? void 0 : users.map((user, index) => {
            return (<tr key={index} className="py-16 leading-[55px]  justify-center items-center w-full sm:py-4">
                <td className="flex h-[55px] items-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={user.imageUrl} alt="Neil image"/>
                  </div>
                  <div className="flex flex-col justify-center min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {`${user.firstName} ${user.lastName ? user.lastName : ""}`}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.emailAddresses[0].emailAddress}
                    </p>
                  </div>
                </td>
                <td className="text-center"> {user === null || user === void 0 ? void 0 : user.completedCourses} </td>
                <td className="text-center">
                  <link_1.default className="text-white font-normal text-xl transition-all shadow-3xl rounded-md hover:bg-[rgba(0,118,255,0.9)] bg-[#2655a3] px-6 py-[2px] outline-0 cursor-pointer border-none " href={`/teacher/students/${user.id}`}>
                    تقرير
                  </link_1.default>
                </td>
              </tr>);
        })}
          {loading && (<div className="flex justify-center items-center">
              <loading_spinner_1.default />
            </div>)}
        </table>
      </div>
    </div>);
};
exports.default = UserCard;
