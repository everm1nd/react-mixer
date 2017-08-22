const fs = require('fs')
const path = require('path')
const Merge = require('webpack-merge');

const addEnvConfigTo = (commonConfig) => {
  const env = process.env.NODE_ENV || 'development'
  const envConfigPath = path.resolve(__dirname, `./webpack.${env}.js`);

  let envSpecificConfig = {};

  if (fs.existsSync(envConfigPath)) {
    console.log(`Using ${env} config for webpack.`)
    envSpecificConfig = require(envConfigPath)
  } else {
    console.log(`WARNING: Can't load webpack config for '${env}'. File ${envConfigPath} not found.`)
  }

  return Merge(commonConfig, envSpecificConfig)
}

module.exports = addEnvConfigTo;
