"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = void 0;
const handleHttpError = (res, error, statusCode = 500) => {
    const message = error.message || 'Unknown error occurred';
    res.status(statusCode).json({ message });
};
exports.handleHttpError = handleHttpError;
