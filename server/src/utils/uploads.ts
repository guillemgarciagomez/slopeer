import path from 'path';
import * as fs from 'fs';
import s3 from './uploader';
import { PictureType } from '../types/types';
import webp from 'webp-converter';
webp.grant_permission();

const uploadPicture = async (picture: PictureType, id: string, folder: string) => {
  const { createReadStream, filename } = await picture;
  const pictureName = id + '.' + filename.split('.').slice(-1);

  const local_path = path.join(__dirname, '../images/' + folder);

  await new Promise((res) =>
    createReadStream()
      .pipe(fs.createWriteStream(local_path + pictureName))
      .on('close', res));

  const webp_path = path.join(__dirname, '../images/' + folder, id + '.webp');
  await webp.cwebp(local_path + pictureName, webp_path, '-q 50 -quiet');

  let params = {
    Bucket: process.env.BUCKET as string,
    Key: folder + pictureName,
    Body: fs.createReadStream(local_path + pictureName),
    ACL: 'public-read'
  };
  await s3.upload(params).promise();

  params.Key = folder + id + '.webp';
  params.Body = fs.createReadStream(webp_path);
  await s3.upload(params).promise();

  return pictureName;
};

module.exports.uploadProfilePicture = async (picture: PictureType, id: string) => {
  await uploadPicture(picture, id, 'profile_pictures/');
}
module.exports.uploadRoutePicture = async (picture: PictureType, id: string) => {
  await uploadPicture(picture, id, 'route_pictures/');
}
