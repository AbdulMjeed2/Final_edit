"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWidget = ChatWidget;
const popover_1 = require("@/components/ui/popover");
const react_1 = __importDefault(require("react"));
const chat_tabs_1 = require("./chat-tabs");
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const trigger_1 = require("@/lib/trigger");
function ChatWidget({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    const trigger = (0, react_redux_1.useSelector)((state) => state.trigger.value);
    const dispatch = (0, react_redux_1.useDispatch)();
    return (<div>
      {((!pathname.includes("exam") && !pathname.includes("quiz")) || pathname.includes("teacher")) &&
            (<popover_1.Popover open={trigger}>
            <popover_1.PopoverTrigger onClick={() => dispatch((0, trigger_1.onToggle)())} asChild>{children}</popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="w-fit rounded-xl ml-5 p-0">
              <chat_tabs_1.ChatWidgetTabs />
            </popover_1.PopoverContent>
          </popover_1.Popover>)}

    </div>);
}
