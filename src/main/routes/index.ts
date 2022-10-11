import multer from 'multer'
import uploadConfig from '../config/upload'
import Router from 'express'

import { ProcessXBRLController } from '@/controllers/process-xbrl.controller'
import { makeUploadFileController } from '../factories/upload-file'

const routes = Router()
const upload = multer(uploadConfig.multer)
const processXBRLController = new ProcessXBRLController()
const uploadFileController = makeUploadFileController()

routes.post('/all', processXBRLController.handle)
routes.post('/upload-file', upload.single('file'), uploadFileController.handle)

export { routes }
