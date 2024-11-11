"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Template;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const loading_spinner_1 = __importDefault(require("./loading-spinner"));
function Template({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);
        window.addEventListener("routeChangeStart", handleStart);
        window.addEventListener("routeChangeComplete", handleComplete);
        window.addEventListener("routeChangeError", handleComplete);
        return () => {
            window.removeEventListener("routeChangeStart", handleStart);
            window.removeEventListener("routeChangeComplete", handleComplete);
            window.removeEventListener("routeChangeError", handleComplete);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        setIsLoading(false);
        console.log("changing", pathname, searchParams);
    }, [pathname, searchParams]);
    return (<>
      {isLoading && <loading_spinner_1.default />}
      {children}
    </>);
}
