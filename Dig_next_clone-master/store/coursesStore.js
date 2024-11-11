"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const zustand_1 = require("zustand");
const initialState = {
    courses: [],
    loading: false,
};
const useCoursesStore = (0, zustand_1.create)((set) => (Object.assign(Object.assign({}, initialState), { fetchItems: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield fetch("/api/courses");
            const data = yield response.json();
            set({ courses: data, loading: false });
        }
        catch (error) {
            console.error("Failed to fetch items:", error);
        }
        finally {
            set({ loading: false });
        }
    }) })));
exports.default = useCoursesStore;
