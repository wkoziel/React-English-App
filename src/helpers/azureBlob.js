import { BlobServiceClient } from '@azure/storage-blob';
import { getSASToken } from '../api/api';

const containerName = process.env.REACT_APP_CONTAINERNAME;
const storageAccountName = process.env.REACT_APP_STORAGENAME;

// eslint-disable-next-line
const getBlobsInContainer = async (containerClient) => {
   const returnedBlobUrls = [];
   // eslint-disable-next-line
   for await (const blob of containerClient.listBlobsFlat()) {
      returnedBlobUrls.push(`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`);
   }
   return returnedBlobUrls;
};

const createBlobInContainer = async (containerClient, file) => {
   const blobClient = containerClient.getBlockBlobClient(file.name);
   const options = { blobHTTPHeaders: { blobContentType: file.type } };
   await blobClient.uploadBrowserData(file, options);
   await blobClient.setMetadata({ UserName: 'Wojtek' });
};

const uploadFileToBlob = async (file) => {
   if (!file) return [];
   try {
      const response = await getSASToken();
      const blobService = new BlobServiceClient(
         `https://${storageAccountName}.blob.core.windows.net/?${response.data.token}`,
      );
      const containerClient = blobService.getContainerClient(containerName);
      await createBlobInContainer(containerClient, file);
   } catch (error) {
      console.log(error);
   }
};

export default uploadFileToBlob;
