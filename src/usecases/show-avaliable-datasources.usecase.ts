import * as datasourcesAvailable from '../plugins/datasources.json'

type AvailableDatasource = {
  name: string
}

type Response = {
  availablesDatasources: AvailableDatasource[]
}

class ShowAvaliableDatasourcesUsecase {
  public async execute(): Promise<Response> {
    return { availablesDatasources: datasourcesAvailable }
  }
}

export { ShowAvaliableDatasourcesUsecase }
