const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec')

function run(){
    // Get Input Values from workflow
    const bucketName = core.getInput('bucket-name', {required: true})
    const bucketRegion = core.getInput('bucket-region', {required: true})
    const distFolder = core.getInput('dist-folder', {required: true})

    // Upload Files
    const S3uri = `s3://${bucketName}`
    exec.exec(`aws s3 sync ${distFolder} ${S3uri} --region ${bucketRegion}`)

    // Output URL
    const websiteURL = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`
    core.setOutput('website-url', websiteURL)

}

run();