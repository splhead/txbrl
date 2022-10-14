import { DataSource } from '@/usecases/ports/datasources'
import { ConnectionOptions } from 'mysql2'

class MysqlDatasource implements DataSource {
  private async connect(options: ConnectionOptions): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async getData(query: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { MysqlDatasource }
