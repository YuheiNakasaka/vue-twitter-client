'use strict'

require('dotenv').config({ path: __dirname + '/.env' })

import Application from './application'

global.application = new Application()
global.application.run()
