"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navbar_1 = require("./_components/navbar");
const sidebar_1 = require("./_components/sidebar");
const popup_1 = require("./_components/popup");
const chatbot_popup_1 = require("../(course)/courses/[courseId]/_components/chatbot-popup");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const DashboardLayout = ({ children }) => {
    return (<div className="h-full relative w-full">
      
      <popup_1.Popup />
      <div className="h-[80px] md:pr-56 fixed inset-y-0 w-full z-40">
        <navbar_1.Navbar />
      </div>

      <main className="md:pr-56 pt-[80px]  h-full">
        
        {children}</main>
      <div className="hidden md:flex h-full w-56 flex-col fixed right-0 inset-y-0 z-40">
        <sidebar_1.Sidebar />
      </div>
      <div className="fixed left-5 bottom-5 z-50">
        <chatbot_popup_1.ChatWidget>
          <button_1.Button variant="outline" className="bg-sky-700 rounded-full p-4 h-14 w-14 shadow-md hover:bg-sky-600">
            <lucide_react_1.MessageCircle size={30} color="white"/>
          </button_1.Button>
        </chatbot_popup_1.ChatWidget>
      </div>
    </div>);
};
exports.default = DashboardLayout;
