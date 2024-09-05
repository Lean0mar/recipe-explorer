"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const hashPassword = (password) => {
    return crypto_js_1.default.SHA256(password).toString();
};
exports.hashPassword = hashPassword;
const verifyPassword = (password, hash) => {
    return hash === crypto_js_1.default.SHA256(password).toString();
};
exports.verifyPassword = verifyPassword;
