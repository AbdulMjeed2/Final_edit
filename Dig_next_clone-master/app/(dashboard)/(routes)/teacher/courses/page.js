"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_table_1 = require("./_components/data-table");
const columns_1 = require("./_components/columns");
const react_1 = require("react");
const coursesStore_1 = __importDefault(require("@/store/coursesStore"));
const CoursesPage = () => {
    const { courses, fetchItems, loading } = (0, coursesStore_1.default)();
    (0, react_1.useEffect)(() => {
        fetchItems();
    }, [fetchItems]);
    return (<div className="p-6">
      <data_table_1.DataTable columns={columns_1.columns} data={courses} isLoading={loading}/>
    </div>);
};
exports.default = CoursesPage;
