import { ProcessXBRLUseCase } from '@/usecases/process-xbrl.usecase'
import { Request, Response } from 'express'

class ProcessXBRLController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const processXBRLUseCase = new ProcessXBRLUseCase()

    const result = processXBRLUseCase.execute()

    return response.json(result)
  }
}

export { ProcessXBRLController }
