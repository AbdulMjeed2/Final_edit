"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLoading;
const loading_spinner_1 = __importDefault(require("@/app/loading-spinner"));
function DashboardLoading() {
    return <loading_spinner_1.default />;
}
