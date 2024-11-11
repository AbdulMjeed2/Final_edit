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
exports.Combobox = void 0;
const React = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const fa_1 = require("react-icons/fa");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
const command_1 = require("@/components/ui/command");
const popover_1 = require("@/components/ui/popover");
const axios_1 = __importDefault(require("axios"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const Combobox = ({ options, value, onChange }) => {
    var _a;
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const router = (0, navigation_1.useRouter)();
    const handleAddCategory = () => __awaiter(void 0, void 0, void 0, function* () {
        if (category.trim() === "")
            return;
        setLoading(true);
        try {
            yield axios_1.default.post(`/api/categories`, { name: category });
            react_hot_toast_1.default.success("Category added successfully");
            router.refresh();
            setCategory("");
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
        finally {
            setLoading(false);
        }
    });
    // const onDelete = async (id : string) => {
    //   try {
    //     //  setIsDeleting(true);
    //     debugger
    //     await axios.delete(
    //       `/api/categories/${id}`
    //     );
    //     //deleted(id)
    //     toast.success("Option deleted");
    //     router.refresh();
    //   } catch {
    //     toast.success("Option deleted");
    //     router.refresh();
    //   } finally {
    //   //  setIsDeleting(false);
    //   }
    // };
    return (<popover_1.Popover open={open} onOpenChange={setOpen}>
      <popover_1.PopoverTrigger asChild>
        <button_1.Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value
            ? (_a = options.find((option) => option.value === value)) === null || _a === void 0 ? void 0 : _a.label
            : "...حدد الخيار"}
          <lucide_react_1.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </button_1.Button>
      </popover_1.PopoverTrigger>
      <popover_1.PopoverContent className="w-full p-0">
        <command_1.Command>
          <command_1.CommandInput placeholder="...خيار البحث"/>
          <command_1.CommandEmpty>.لم يتم العثور على أي خيار</command_1.CommandEmpty>
          <command_1.CommandGroup>
            {options.map((option) => (<command_1.CommandItem key={option.value} onSelect={() => {
                onChange(option.value === value ? "" : option.value);
                setOpen(false);
            }}>
                {/* <Delete
              onClick = {() => onDelete(option.value)}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            /> */}
                <lucide_react_1.Check className={(0, utils_1.cn)("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")}/>
                {option.label}
              </command_1.CommandItem>))}
          </command_1.CommandGroup>
          <div className="flex border-t items-center justify-around">
            <input type="text" value={category} onChange={(e) => {
            setCategory(e.target.value);
        }} className="bg-white outline-none pl-3 placeholder:text-gray-600 text-sm placeholder:text-sm placeholder:font-thin" placeholder="إضافة فئة"/>
            <button onClick={handleAddCategory} className="hover:bg-slate-100 px-3 h-full py-2">
              {!loading ? (<lucide_react_1.Plus className="opacity-50"/>) : (<fa_1.FaSpinner className="opacity-50 animate-spin m-2 text-slate-700"/>)}
            </button>
          </div>
        </command_1.Command>
      </popover_1.PopoverContent>
    </popover_1.Popover>);
};
exports.Combobox = Combobox;
