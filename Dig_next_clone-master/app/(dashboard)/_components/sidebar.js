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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const db_1 = require("@/lib/db");
const logo_1 = require("./logo");
const sidebar_routes_1 = require("./sidebar-routes");
const Sidebar = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const courses = yield db_1.db.lesson.findMany();
    const lastCourse = (_a = courses.sort((a, b) => (b === null || b === void 0 ? void 0 : b.updatedAt) - (a === null || a === void 0 ? void 0 : a.updatedAt))) === null || _a === void 0 ? void 0 : _a[0];
    const lastCourseEditDate = new Date(lastCourse === null || lastCourse === void 0 ? void 0 : lastCourse.updatedAt);
    return (<div className="h-full border-r custom-scroll-bar relative flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex justify-center">
        <logo_1.Logo />
      </div>
      <div className="flex flex-col w-full">
        <sidebar_routes_1.SidebarRoutes />
      </div>
      <p className="bottom-8 pt-4 text-xs text-gray-400 text-center right-8">
        اخر تحديث للموقع بتاريخ{" "}
        {`${lastCourseEditDate.getFullYear()}/${lastCourseEditDate.getMonth() + 1}/${lastCourseEditDate.getDate()}`}
      </p>
    </div>);
});
exports.Sidebar = Sidebar;
