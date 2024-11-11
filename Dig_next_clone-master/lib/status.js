"use strict";
'use client';
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToggle = exports.setClose = exports.setOpen = exports.statusSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    value: false
};
exports.statusSlice = (0, toolkit_1.createSlice)({
    name: 'status',
    initialState,
    reducers: {
        setOpen: (state) => { state.value = true; },
        setClose: (state) => { state.value = false; },
        setToggle: (state) => { state.value = !state.value; },
    }
});
_a = exports.statusSlice.actions, exports.setOpen = _a.setOpen, exports.setClose = _a.setClose, exports.setToggle = _a.setToggle;
exports.default = exports.statusSlice.reducer;
