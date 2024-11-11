"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const query_string_1 = __importDefault(require("query-string"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const input_1 = require("@/components/ui/input");
const use_debounce_1 = require("@/hooks/use-debounce");
const SearchInput = () => {
    const [value, setValue] = (0, react_1.useState)("");
    const debouncedValue = (0, use_debounce_1.useDebounce)(value);
    const searchParams = (0, navigation_1.useSearchParams)();
    const router = (0, navigation_1.useRouter)();
    const pathname = (0, navigation_1.usePathname)();
    const currentCategoryId = searchParams.get("categoryId");
    (0, react_1.useEffect)(() => {
        const url = query_string_1.default.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname]);
    return (<div className="relative">
      <lucide_react_1.Search className="h-4 w-4 absolute top-3 left-3 text-slate-600"/>
      <input_1.Input onChange={(e) => setValue(e.target.value)} value={value} className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="ابحث عن دورة"/>
    </div>);
};
exports.SearchInput = SearchInput;
