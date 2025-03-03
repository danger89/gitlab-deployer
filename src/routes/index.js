const express = require('express')
const router = express.Router()
const gitlabRoute = require('./gitlab')

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the GitLab Artifact Deployer service' })
})
  .use('/gitlab', gitlabRoute)

router.get('/health', (req, res) => {
  const errorCode = (global.ErrorState) ? 500 : 200
  const result = (global.ErrorState) ? 'NOK' : 'OK'
  res.status(errorCode).json({ result })
})

module.exports = router
