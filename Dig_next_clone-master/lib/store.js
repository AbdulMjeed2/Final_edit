"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const trigger_1 = __importDefault(require("./trigger"));
const status_1 = __importDefault(require("./status"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        trigger: trigger_1.default,
        status: status_1.default
    }
});
