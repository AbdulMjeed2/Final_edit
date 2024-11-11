"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfettiProvider = void 0;
const react_confetti_1 = __importDefault(require("react-confetti"));
const use_confetti_store_1 = require("@/hooks/use-confetti-store");
const ConfettiProvider = () => {
    const confetti = (0, use_confetti_store_1.useConfettiStore)();
    if (!confetti.isOpen)
        return null;
    return (<react_confetti_1.default className="pointer-events-none z-[100]" numberOfPieces={500} recycle={false} onConfettiComplete={() => {
            confetti.onClose();
        }}/>);
};
exports.ConfettiProvider = ConfettiProvider;
