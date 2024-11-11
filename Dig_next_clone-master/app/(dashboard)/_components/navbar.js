"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const navbar_routes_1 = require("@/components/navbar-routes");
const mobile_sidebar_1 = require("./mobile-sidebar");
const Navbar = () => {
    return (<div className="p-4 border-b h-full flex bg-white items-center shadow-sm">
      <mobile_sidebar_1.MobileSidebar />
      <navbar_routes_1.NavbarRoutes />
    </div>);
};
exports.Navbar = Navbar;
