import { makeUploadFileUseCase } from '@/main/factories/upload-file'
import { Request, Response } from 'express'

class UploadFileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const uploadFileUseCase = makeUploadFileUseCase()

    const result = await uploadFileUseCase.execute({
      filename: request.file?.filename
    })

    return response.json(result)
  }
}

export { UploadFileController }
