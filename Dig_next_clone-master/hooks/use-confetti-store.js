"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfettiStore = void 0;
const zustand_1 = require("zustand");
exports.useConfettiStore = (0, zustand_1.create)((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
