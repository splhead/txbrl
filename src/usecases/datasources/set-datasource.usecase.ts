import { sign } from 'jsonwebtoken'

export type DatasourceOptions = {
  type: string
  host?: string
  port?: number
  database?: string
  user?: string
  password?: string
}

type Response = {
  token: string
}

class SetDatasourceUsecase {
  public async execute(data: DatasourceOptions): Promise<Response> {
    const token = sign(data, process.env.APP_SECRET || 'secret', {
      expiresIn: '1d'
    })

    return { token }
  }
}

export { SetDatasourceUsecase }
