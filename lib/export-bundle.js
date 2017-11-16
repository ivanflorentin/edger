// docs here
// https://docs.apigee.com/management/apis/post/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D-0

const fs = require('fs');
const request = require("request");
const archiver = require('archiver');

const cleanDir = function(fileToDelete) {
    fs.unlink(fileToDelete, function(error) {
        if (error) throw error;

        console.log("\n===================================================================================")
        console.log('cleaning directory..');
        console.log("===================================================================================\n")

    });
}

const exportZipFile = function (folderToZip, config) {

    const {
        api_organization,
        api_name,
        api_revision,
        apigee_username,
        apigee_password
    } = config

    let fileToSend = fs.createReadStream(folderToZip + '/bundle.zip')

    let options = {
        method: 'POST',
        url: `https://api.enterprise.apigee.com/v1/organizations/${api_organization}/apis/${api_name}/revisions/${api_revision}`,
        auth: {
            user: apigee_username,
            password: apigee_password
        },
        headers: {
            'content-type': 'multipart/form-data'
        },
        formData: {
            file: fileToSend
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        
        console.log("\n===================================================================================")
        console.log('Exported Succesfully...');
        console.log("===================================================================================\n")
        
        cleanDir(folderToZip + '/bundle.zip')
    });
}

const streamZipFile = function (config, folderToZip) {

    let output = fs.createWriteStream(folderToZip + '/bundle.zip');
    let archive = archiver('zip');

    output.on('close', function () {
        console.log("\n===================================================================================")
        console.log('bundle is ready to be exported...');
        console.log("===================================================================================\n")

        console.log(archive.pointer() + ' total bytes zipped');

        console.log("\n===================================================================================")
        console.log('export to APIGEE begins...');
        console.log("===================================================================================\n")

        exportZipFile(folderToZip, config)
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    let directory = folderToZip;

    archive
        .directory(directory, 'apiproxy')
        .finalize();
}

module.exports = streamZipFile