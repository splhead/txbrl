import { UploadFileController } from '@/controllers/upload-file.controller'
import { DiskStorageProvider } from '@/main/adapters/disk-storage-provider'
import { UploadFileUseCase } from '@/usecases/upload-file/upload-file.usecase'

const makeUploadFileController = () => {
  return new UploadFileController()
}

const makeUploadFileUseCase = () => {
  const diskStorageProvider = new DiskStorageProvider()
  return new UploadFileUseCase(diskStorageProvider)
}

export { makeUploadFileController, makeUploadFileUseCase }
