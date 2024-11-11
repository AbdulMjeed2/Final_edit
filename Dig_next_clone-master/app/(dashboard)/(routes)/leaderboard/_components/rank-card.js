"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@/lib/utils");
const image_1 = __importDefault(require("next/image"));
const react_1 = __importDefault(require("react"));
const fa_1 = require("react-icons/fa");
const RankCard = ({ fullName, imageUrl, points, rank, lessonsCompleted }) => {
    const image = rank === 1
        ? "/gold-medal.png"
        : rank === 2
            ? "/silver-medal.png"
            : "/bronze-medal.png";
    const imageAlt = rank === 1 ? "/gold-medal" : rank === 2 ? "/silver-medal" : "/bronze-medal";
    return (<div className="rounded-md border bg-slate-100 flex justify-between">
      <div className="space-y-4 p-4">
        <div className="flex space-x-2 items-center">
          {imageUrl ? (<image_1.default src={imageUrl} alt="user avatar" height={20} width={20} className="rounded-full"/>) : (<div className="bg-sky-500 rounded-full flex items-center justify-center h-12 w-12">
              {fullName.slice(0, 1)}
            </div>)}
          <h4 className="font-semibold text-lg">{fullName}</h4>
        </div>
        <div className="flex gap-2">
          <div className="rounded-md bg-slate-200 p-2">
            <div className="flex space-x-1 items-center">
              <fa_1.FaStar size={20} className="text-sky-500"/>
              <span className="text-xl font-bold ">{points}</span>
            </div>
          </div>
          
          
        </div>

      </div>
      <div className="max-h-full">
        <image_1.default src={image} alt={imageAlt} height={100} width={100} className={(0, utils_1.cn)(rank === 2 && "-mt-3")}/>
      </div>
    </div>);
};
exports.default = RankCard;
