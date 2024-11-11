"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const badge_1 = require("@/components/ui/badge");
const utils_1 = require("@/lib/utils");
exports.columns = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (<button_1.Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          عنوان
          <lucide_react_1.ArrowUpDown className="ml-2 h-4 w-4"/>
        </button_1.Button>);
        },
    },
    // {
    //   accessorKey: "price",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Price
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => {
    //     const price = parseFloat(row.getValue("price") || "0");
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD"
    //     }).format(price);
    //     return <div>{formatted}</div>
    //   }
    // },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            return (<button_1.Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          الحالة
          <lucide_react_1.ArrowUpDown className="ml-2 h-4 w-4"/>
        </button_1.Button>);
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false;
            return (<badge_1.Badge className={(0, utils_1.cn)("bg-slate-500", isPublished && "bg-sky-700")}>
          {isPublished ? "منشورة" : "مسودة"}
        </badge_1.Badge>);
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return (<dropdown_menu_1.DropdownMenu>
          <dropdown_menu_1.DropdownMenuTrigger asChild>
            <button_1.Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <lucide_react_1.MoreHorizontal className="h-4 w-4"/>
            </button_1.Button>
          </dropdown_menu_1.DropdownMenuTrigger>
          <dropdown_menu_1.DropdownMenuContent align="end">
            <link_1.default href={`/teacher/courses/${id}`}>
              <dropdown_menu_1.DropdownMenuItem>
                <lucide_react_1.Pencil className="h-4 w-4 mr-2"/>
                تعديل
              </dropdown_menu_1.DropdownMenuItem>
            </link_1.default>
          </dropdown_menu_1.DropdownMenuContent>
        </dropdown_menu_1.DropdownMenu>);
        },
    },
];
