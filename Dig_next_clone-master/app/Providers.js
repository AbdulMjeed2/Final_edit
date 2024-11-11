"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = Providers;
const store_1 = require("@/lib/store");
const react_redux_1 = require("react-redux");
function Providers({ children }) {
    return (<react_redux_1.Provider store={store_1.store}>
            {children}
        </react_redux_1.Provider>);
}
