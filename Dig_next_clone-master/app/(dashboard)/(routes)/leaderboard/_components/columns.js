"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
const gi_1 = require("react-icons/gi");
exports.columns = [
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (<button_1.Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          طالب
          <lucide_react_1.ArrowUpDown className="ml-2 h-4 w-4"/>
        </button_1.Button>);
        },
        cell: ({ row }) => {
            const fullName = row.getValue("fullName");
            if ((0, utils_1.isEmail)(fullName)) {
                return <div>{(0, utils_1.obfuscateEmailMiddleCharacters)(fullName)}</div>;
            }
        },
    },
    {
        accessorKey: "points",
        header: ({ column }) => {
            return (<button_1.Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Points
          <lucide_react_1.ArrowUpDown className="ml-2 h-4 w-4"/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: "numberOfTakenQuizzes",
        header: ({ column }) => {
            return (<button_1.Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          عدد الاختبارات التي تم إجراؤها
          <lucide_react_1.ArrowUpDown className="ml-2 h-4 w-4"/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: "rank",
        header: ({ column }) => {
            return (<button_1.Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rank
          <lucide_react_1.ArrowUpDown className="ml-2 h-4 w-4"/>
        </button_1.Button>);
        },
        cell: ({ row }) => {
            const rank = row.getValue("rank");
            const rankToString = rank.toString();
            const rankSubString = rankToString.substring(0, rankToString.length);
            const rankSuperScriptText = rankSubString === "1"
                ? "st"
                : rankSubString === "2"
                    ? "nd"
                    : rankSubString === "3"
                        ? "rd"
                        : "th";
            return (<div className="flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <gi_1.GiStarMedal className="text-amber-300"/>
            <div className="font-semibold text-lg pl-2">
              {rank}
              <sup className="">{rankSuperScriptText}</sup>
            </div>
          </div>
        </div>);
        },
    },
];
