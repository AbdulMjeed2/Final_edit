"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryItem = void 0;
const query_string_1 = __importDefault(require("query-string"));
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
;
const CategoryItem = ({ label, value, icon: Icon, }) => {
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");
    const isSelected = currentCategoryId === value;
    const onClick = () => {
        const url = query_string_1.default.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };
    return (<button onClick={onClick} className={(0, utils_1.cn)("py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition", isSelected && "border-sky-700 bg-sky-200/20 text-sky-800")} type="button">
      {Icon && <Icon size={20}/>}
      <div className="truncate">
        {label}
      </div>
    </button>);
};
exports.CategoryItem = CategoryItem;
