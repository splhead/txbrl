import { DataSource } from '@/usecases/datasources/ports/datasources'

class PostgresDatasource implements DataSource {
  getData(query: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { PostgresDatasource }
