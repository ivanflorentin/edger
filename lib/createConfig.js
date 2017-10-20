const xmlparser = require('xml-parser')
const fs = require('fs')

const inspect = require('util').inspect

let config = {}

const log = console.log.bind(console)

const getEnvVariables = () => {
  let result = {}
  const env = process.env
 

  if (env.APIGEE_USERNAME !== undefined){
   result.apigee_username = env.APIGEE_USERNAME 
  }
  if(env.APIGEE_PASSWORD !== undefined) {
    result.apigee_password = env.APIGEE_PASSWORD
  }
  if(env.API_REVISION !== undefined) {
    result.api_revision = env.API_REVISION
  }
  if(env.API_NAME !== undefined) {
    result.api_name = env.API_NAME
  }
  if(env.API_ORGANIZATION !== undefined) {
    result.api_organization = env.API_ORGANIZATION
  }
  if(env.API_ENVIRONMENT !== undefined) {
    result.api_environment = env.API_ENVIRONMENT
  }
  return result
}

const getConfigFromXML = () => {
  let result = {}
  try {
    let xmls = fs.readdirSync('./apiproxy', 'utf8').filter(fname => {
      if (fname.split('.').indexOf('xml') > 0) {
        return fname
      }
    })
    if (xmls.length !== 1) {
      throw ('Could not determine XML file, please specify config file')
    }
    const cfile = fs.readFileSync(`./apiproxy/${xmls[0]}`, 'utf8')
    const xmlconfig = xmlparser(cfile)
    result = { 'api_name': xmlconfig.root.attributes.name,
	   'api_revision': xmlconfig.root.attributes.revision}
    return result
  } catch (err) {
    log(err)
  }
}

const getConfigFromFile = () => {
  try {
    fs.readFileSync('edger.json')
    
  }catch (err){
    log(err)
  }
}


module.exports = (parameters) =>{
  result = {...getConfigFromXML(), ...getEnvVariables()}
  return result
}
