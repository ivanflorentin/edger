
// docs here:
// http://docs.apigee.com/management/apis/put/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D/resourcefiles/%7Bresource_type%7D/%7Bresource_name%7D-0

const request = require('request-promise')
const fs = require('fs')
const base64 = require('base-64')
const utf8 = require('utf8')

const filename = process.argv[2]

const config = {
  'apigee_username': '',
  'apigee_password': '',
  'api_name': '',
  'api_org': '',
  'api_revision': '1',
  'api_environment': 'test'  
}
let resourceName = filename.split('/').slice(-1)[0]
console.log(resourceName)

const auth = config['apigee_username'] + ':' + config['apigee_password']
console.log(auth)
console.log(base64.encode(utf8.encode(auth)))

const url = `https://api.enterprise.apigee.com/v1/o/${config['api_org']}/apis/${config['api_name']}/revisions/${config['api_revision']}/resourcefiles/jsc/${resourceName}`
const options = {
  method: 'PUT',
  url: url,
  headers: {
    'Authorization': 'Basic ' + base64.encode(utf8.encode(auth)),
    'Content-type': 'multipart/form-data'
  },
  'body': fs.createReadStream(filename)
}

console.log('options', options)

request(options).then( (respString)=>{console.log(respString)}).catch((err)=>{console.log(err)})

