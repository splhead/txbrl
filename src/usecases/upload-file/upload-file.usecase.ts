import { StorageProvider } from './ports/storage-provider'

type Request = {
  filename?: string
}

class UploadFileUseCase {
  constructor(private StorageProvider: StorageProvider) {}
  public async execute({ filename }: Request): Promise<string> {
    if (!filename) {
      throw new Error('File missing!')
    }

    const uploadedFileName = await this.StorageProvider.saveFile(filename)

    return uploadedFileName
  }
}

export { UploadFileUseCase }
