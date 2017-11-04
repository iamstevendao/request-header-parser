var os = require('os')

exports.index = (req, res) => {
  res.json(getPCInfo())
}

function getPCInfo () {
  let result = {}
  let cpus = os.cpus()
  result.processor = cpus[0].model + ' x' + cpus.length
  result.platform = getPlatform()
  result.username = os.userInfo().username
  return result
}

function getPlatform () {
  let platform = os.type()
  if (platform === 'Darwin')
    return 'MacOS'
  if (platform === 'Windows_NT')
    return 'Windows'
  return platform
}