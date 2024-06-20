import { BlobServiceClient } from '@azure/storage-blob'
import { config } from 'dotenv'

config()

const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
)
const containerClient =
    blobServiceClient.getContainerClient('yabe-common-files')

export const uploadFile = async (file) => {
    const { originalname, buffer } = file
    const blobName = `${Date.now()}-${originalname}`
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    await blockBlobClient.uploadData(buffer)

    return blobName
}

export const downloadFile = async (fileName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)

    console.log('Downloading file: ', fileName)
    const downloadBlockBlobResponse = await blockBlobClient.download()

    return downloadBlockBlobResponse.readableStreamBody
}

export const getBlobUrl = (fileName) => {
    const containerUrl = containerClient.url
    return `${containerUrl}/${fileName}`
}
