"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.default = exports = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_S3_ID,
    secretAccessKey: process.env.AWS_S3_SECRET,
    region: 'eu-central-1'
});
