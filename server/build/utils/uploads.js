"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const uploader_1 = __importDefault(require("./uploader"));
const webp_converter_1 = __importDefault(require("webp-converter"));
webp_converter_1.default.grant_permission();
const uploadPicture = async (picture, id, folder) => {
    const { createReadStream, filename } = await picture;
    const pictureName = id + '.' + filename.split('.').slice(-1);
    const local_path = path_1.default.join(__dirname, '../images/' + folder);
    await new Promise((res) => createReadStream()
        .pipe(fs.createWriteStream(local_path + pictureName))
        .on('close', res));
    const webp_path = path_1.default.join(__dirname, '../images/' + folder, id + '.webp');
    await webp_converter_1.default.cwebp(local_path + pictureName, webp_path, '-q 50 -quiet');
    let params = {
        Bucket: process.env.BUCKET,
        Key: folder + pictureName,
        Body: fs.createReadStream(local_path + pictureName),
        ACL: 'public-read'
    };
    await uploader_1.default.upload(params).promise();
    params.Key = folder + id + '.webp';
    params.Body = fs.createReadStream(webp_path);
    await uploader_1.default.upload(params).promise();
    return pictureName;
};
module.exports.uploadProfilePicture = async (picture, id) => {
    await uploadPicture(picture, id, 'profile_pictures/');
};
module.exports.uploadRoutePicture = async (picture, id) => {
    await uploadPicture(picture, id, 'route_pictures/');
};
