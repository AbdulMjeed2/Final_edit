"use strict";
'use client';
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.onToggle = exports.onClose = exports.onOpen = exports.triggerSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    value: false
};
exports.triggerSlice = (0, toolkit_1.createSlice)({
    name: 'trigger',
    initialState,
    reducers: {
        onOpen: (state) => { state.value = true; },
        onClose: (state) => { state.value = false; },
        onToggle: (state) => { state.value = !state.value; },
    }
});
_a = exports.triggerSlice.actions, exports.onOpen = _a.onOpen, exports.onClose = _a.onClose, exports.onToggle = _a.onToggle;
exports.default = exports.triggerSlice.reducer;
