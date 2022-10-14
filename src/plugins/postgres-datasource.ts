import { DataSource } from '@/usecases/ports/datasources'

class PostgresDatasource implements DataSource {
  getData(query: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { PostgresDatasource }
