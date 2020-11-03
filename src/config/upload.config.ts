import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cb) {
      const hash = crypto.randomBytes(10).toString('hex');
      const fileName = `${hash}-${file.originalname}`;
      return cb(null, fileName);
    },
  }),
};
