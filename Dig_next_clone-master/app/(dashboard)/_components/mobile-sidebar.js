"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileSidebar = void 0;
const lucide_react_1 = require("lucide-react");
const sheet_1 = require("@/components/ui/sheet");
const sidebar_1 = require("./sidebar");
const MobileSidebar = () => {
    return (<sheet_1.Sheet>
      <sheet_1.SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <lucide_react_1.Menu />
      </sheet_1.SheetTrigger>
      <sheet_1.SheetContent side="left" className="p-0 bg-white">
        <sidebar_1.Sidebar />
      </sheet_1.SheetContent>
    </sheet_1.Sheet>);
};
exports.MobileSidebar = MobileSidebar;
