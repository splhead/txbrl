import datasourcesAvailable from '../../datasources/datasources-config'

type AvailableDatasource = {
  name: string
}

class ShowAvaliableDatasourcesUsecase {
  public async execute(): Promise<AvailableDatasource[]> {
    return datasourcesAvailable.datasources.map((datasource) => {
      return { name: datasource.name }
    })
  }
}

export { ShowAvaliableDatasourcesUsecase }
