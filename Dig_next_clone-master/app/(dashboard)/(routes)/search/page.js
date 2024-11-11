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
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const search_input_1 = require("@/components/search-input");
const get_courses_1 = require("@/actions/get-courses");
const courses_list_1 = require("@/components/courses-list");
const categories_1 = require("./_components/categories");
;
const SearchPage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ searchParams }) {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    const categories = yield db_1.db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });
    const courses = yield (0, get_courses_1.getCourses)(Object.assign({ userId }, searchParams));
    return (<>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <search_input_1.SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <categories_1.Categories items={categories}/>
        <courses_list_1.CoursesList items={courses}/>
      </div>
    </>);
});
exports.default = SearchPage;
