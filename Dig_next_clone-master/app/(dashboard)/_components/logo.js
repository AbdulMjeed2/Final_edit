"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const image_1 = __importDefault(require("next/image"));
const Logo = () => {
    return (<image_1.default height={100} width={130} alt="logo" src="/icon.jpg"/>);
};
exports.Logo = Logo;
