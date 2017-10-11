'use strict'

module.exports = {
  mailer: {
    service: 'Gmail',
    auth: {
      user: 'heroku.miriam23@gmail.com',
      pass: process.env.GM_1
    }
  },
  dbConnstring: 'mongodb://admin:123@ds113775.mlab.com:13775/codetogether',
  sessionKey:'HolaCodeTogether'
}
