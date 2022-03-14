require('dotenv').config()
const newman = require('newman')
const fs = require('fs')

const utils = require('./utils')

async function index() {
    const opts = utils.fetchCliArgs()
    const { files, ...secrets } = await utils.getSecrets(['headers', 'cookies', 'files'], pathPrefix = "secret/data")
    const { filePath } = utils.convertToCSV(files["create_order_file"], `./temp/b2c-order-${new Date()}.csv`)

    const secretList = Object.entries(
        // Converting Nested Object to 1D Object
        Object.assign({}, ...Object.values(secrets).map((secret) => secret))
    ).map(([key, value]) => ({ enabled: true, key: key, value: value, type: 'text' })) // Adding `enabled`, `type` properties to each object

    envVars = [
        {
            enabled: true,
            key: "file_path",
            value: filePath,
            type: "text"
        },
        {
            enabled: true,
            key: "base_url",
            value: "https://stagthanosweb.1mg.com",
            type: "text"
        },
        {
            enabled: true,
            key: "customer_id",
            value: 31, // Test Customer Created
            type: "text"
        },
        {
            enabled: true,
            key: "picker_name",
            value: "Shaurya Agarwal",
            type: "text"
        },
        {
            enabled: true,
            key: "per_page",
            value: 1,
            type: "text"
        },
        ...secretList
    ]

    newman.run({
        collection: opts.file,
        envVar: envVars,
        reporters: ['cli', 'htmlextra', 'json'],
        reporter: {
            htmlextra: {
                export: './newman/index.html'
            }
        }
    }, (error) => {
        if (error) throw error
        console.log("success")
    }).on('request', (error, summary) => {
        try {
            data = summary.response.json()
            fs.writeFileSync(`./response/data-${(summary.request?.url?.path).join('-')}.json`, JSON.stringify(data))
            console.log(data)
        } catch (error) {
            console.log("Error: ", error)
        }
    }).on('exception', (error, summary) => {
        console.log(error)
        console.log(summary)
    })
}

index()
