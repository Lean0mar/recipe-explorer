"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cryptoUtils_1 = require("../utils/cryptoUtils");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Recipe' }]
});
UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = (0, cryptoUtils_1.hashPassword)(this.password);
    next();
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
