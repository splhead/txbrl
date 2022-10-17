import multer from 'multer'
import uploadConfig from '../config/upload'
import Router from 'express'

import { ProcessXBRLController } from '@/controllers/process-xbrl.controller'
import { makeUploadFileController } from '../factories/upload-file'
import { DatasourcesController } from '@/controllers/datasources.controller'

const routes = Router()
const upload = multer(uploadConfig.multer)
const processXBRLController = new ProcessXBRLController()
const uploadFileController = makeUploadFileController()
const datasorucesController = new DatasourcesController()

routes.post('/all', processXBRLController.handle)
routes.post('/upload-file', upload.single('file'), uploadFileController.handle)
routes.get('/datasources', datasorucesController.index)
routes.post('/datasources', datasorucesController.setDatasource)

export { routes }
