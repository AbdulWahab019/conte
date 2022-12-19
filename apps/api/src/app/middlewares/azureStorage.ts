import multer = require('multer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

import { environment } from '../../config/config';
export const azureStorage = (containerName: string) =>
  new MulterAzureStorage({
    connectionString: environment.AZURE_STORAGE_CONNECTION_STRING,
    accessKey: environment.AZURE_STORAGE_ACCESS_KEY,
    accountName: environment.AZURE_STORAGE_ACCOUNT_NAME,
    containerName,
    containerAccessLevel: 'blob',
  });

export const uploadTreatmentTypeVideo = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'video/x-msvideo') {
      return cb(null, true);
    } else {
      return cb(new Error('AVI and MP4 are the only formats allowed!'));
    }
  },
  storage: azureStorage('videos'),
});
