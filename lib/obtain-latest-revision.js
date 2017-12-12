var request = require("request");
module.exports = (config, cb) => {

    const {
        api_organization,
        api_name,
        apigee_username,
        apigee_password
    } = config

    var options = { 
        method: 'GET',
        url: `https://api.enterprise.apigee.com/v1/organizations/${api_organization}/apis/${api_name}`,
        auth: {
            user: apigee_username,
            password: apigee_password
        },
        json: true
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        if (response.statusCode === 200) {
            // log(colors.info("\n==================================================================================="))
            // log(colors.info("Policy updated on Apigee"))
            // log(colors.info("===================================================================================\n"))
            // log(colors.verbose("Status: %s OK"), response.statusCode)
            // log(colors.verbose(body))
            //console.log(body);
            let latestRevision = body.revision[body.revision.length - 1]
            //console.log(latestRevision)
            cb(null, latestRevision)
        } else {
            cb(response.statusCode, null)
            // log(colors.error('Status: %s\n'), response.statusCode)
        }
    
    });
    
}