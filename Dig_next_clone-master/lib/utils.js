"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.obfuscateEmailMiddleCharacters = obfuscateEmailMiddleCharacters;
exports.isEmail = isEmail;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function obfuscateEmailMiddleCharacters(email, obscurePercentage = 0.6) {
    const emailLength = email.length;
    const obscureCount = Math.floor(emailLength * obscurePercentage);
    const start = Math.floor((emailLength - obscureCount) / 2);
    const end = start + obscureCount;
    const obscuredMiddle = "*".repeat(obscureCount);
    return (email.charAt(0).toUpperCase() + // Capitalize the first character
        email.substring(1, start) + // Keep the characters before the obscured part
        obscuredMiddle + // Add the obscured middle characters
        email.substring(end) // Add the remaining characters after the obscured part
    );
}
function isEmail(text) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
}
