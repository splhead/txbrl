import { Logger } from 'tslog'
import * as dotenv from 'dotenv'
import { app } from '@/main/config/app'

dotenv.config()
const PORT = process.env.PORT || 3077

const log = new Logger()

app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`)
})
