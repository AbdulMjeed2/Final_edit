"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWidgetTabs = ChatWidgetTabs;
const card_1 = require("@/components/ui/card");
const tabs_1 = require("@/components/ui/tabs");
const chat_gpt_tab_1 = __importDefault(require("./chat-gpt-tab"));
const lucide_react_1 = require("lucide-react");
const chat_asst_tab_1 = __importDefault(require("./chat-asst-tab"));
function ChatWidgetTabs() {
    return (<tabs_1.Tabs defaultValue="chatbot" className="w-[400px]">
      <tabs_1.TabsList className="grid w-full grid-cols-2 p-0 bg-white">
        <tabs_1.TabsTrigger className="data-[state=active]:shadow-none data-[state=active]:text-[#0077c7] data-[state=active]:border-b-2 border-[#0077c7] rounded-none py-3" value="chatbot">
          <card_1.CardTitle className="flex space-x-2 items-center font-bold text-xs">
            <div className="rounded-full h-7 w-7 p-1 flex items-center border bg-[#0077c7] justify-center">
              <lucide_react_1.Headphones size={15} className="text-white"/>
            </div>
            <h2>الخبير</h2>
          </card_1.CardTitle>
        </tabs_1.TabsTrigger>
        <tabs_1.TabsTrigger className="data-[state=active]:shadow-none data-[state=active]:text-[#0077c7] data-[state=active]:border-b-2 border-[#0077c7] rounded-none py-3" value="chatgpt">
          <card_1.CardTitle className="flex space-x-2 items-center font-bold text-xs">
            <div className="rounded-full h-7 w-7 p-1 flex items-center border bg-[#0077c7] justify-center">
              <lucide_react_1.BotIcon size={15} className="text-white"/>
            </div>
            <h2>ChatGPT</h2>
          </card_1.CardTitle>
        </tabs_1.TabsTrigger>
      </tabs_1.TabsList>
      <tabs_1.TabsContent value="chatbot">
        <chat_asst_tab_1.default />
      </tabs_1.TabsContent>
      <tabs_1.TabsContent value="chatgpt">
        <chat_gpt_tab_1.default />
      </tabs_1.TabsContent>
    </tabs_1.Tabs>);
}
