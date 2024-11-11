"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCard = void 0;
const icon_badge_1 = require("@/components/icon-badge");
const InfoCard = ({ variant, icon: Icon, numberOfItems, label, }) => {
    return (<div dir="rtl" className="border rounded-md flex items-center gap-x-2 p-3">
      <icon_badge_1.IconBadge variant={variant} icon={Icon}/>
      <div>
        <div className="font-medium">
          {label}
        </div>
        <div className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "دورات" : "دورات"}
        </div>
      </div>
    </div>);
};
exports.InfoCard = InfoCard;
