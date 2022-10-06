import { ProcessXBRLController } from '@/controllers/process-xbrl.controller'
import Router from 'express'

const routes = Router()
const processXBRLController = new ProcessXBRLController()

routes.post('/all', processXBRLController.handle)

export { routes }
