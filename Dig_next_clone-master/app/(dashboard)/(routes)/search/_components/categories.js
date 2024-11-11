"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const fc_1 = require("react-icons/fc");
const category_item_1 = require("./category-item");
const iconMap = {
    "Music": fc_1.FcMusic,
    "Photography": fc_1.FcOldTimeCamera,
    "Fitness": fc_1.FcSportsMode,
    "Accounting": fc_1.FcSalesPerformance,
    "Computer Science": fc_1.FcMultipleDevices,
    "Filming": fc_1.FcFilmReel,
    "Engineering": fc_1.FcEngineering,
};
const Categories = ({ items, }) => {
    return (<div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (<category_item_1.CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id}/>))}
    </div>);
};
exports.Categories = Categories;
