const { execSync } = require('child_process')
const path = require('path')
const POST_DEPLOYMENT_COMMAND = process.env.POST_DEPLOYMENT_COMMAND || null
const DESTINATION_PATH = process.env.DESTINATION_PATH || path.join(__dirname, '..', 'dest')
const POST_DEPLOYMENT_CWD = process.env.POST_DEPLOYMENT_CWD || DESTINATION_PATH

class PostDeployment {
  /**
   * Execute post-deployment command in the working directory of the destination folder.
   */
  static execute () {
    if (POST_DEPLOYMENT_COMMAND) {
      console.log('INFO: Executing post-deployment command...')
      try {
        execSync(POST_DEPLOYMENT_COMMAND, {
          cwd: POST_DEPLOYMENT_CWD,
          stdio: 'inherit'
        })
        console.log('INFO: Post-deployment command successfully executed.')
      } catch (error) {
        console.error('ERROR: Something went wrong during post-deployment command execution.')
        console.error(error)
      }
    }
  }
}

module.exports = PostDeployment.execute
