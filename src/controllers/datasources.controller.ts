import { SetDatasourceUsecase } from '@/usecases/datasources/set-datasource.usecase'
import { ShowAvaliableDatasourcesUsecase } from '@/usecases/datasources/show-avaliable-datasources.usecase'
import { Request, Response } from 'express'

class DatasourcesController {
  public async index(_: Request, response: Response): Promise<Response> {
    const result = await new ShowAvaliableDatasourcesUsecase().execute()
    return response.json(result)
  }

  public async setDatasource(
    request: Request,
    response: Response
  ): Promise<Response> {
    const data = request.body
    const result = await new SetDatasourceUsecase().execute(data)
    return response.json(result)
  }
}

export { DatasourcesController }
