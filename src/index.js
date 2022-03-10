require('dotenv').config()
const newman = require('newman')
const fs = require('fs')

const utils = require('./utils')

const csv_object = [
    {
        "SKU ID": "156242",
        "SKU Name": "Dexorange Capsule - bottle (30)",
        "Quantity": 8,
        "Discount% on MRP": 10
    }
]


async function index() {
    const opts = utils.fetchCliArgs()
    const { filePath } = utils.convertToCSV(csv_object, `./temp/b2c-order-${new Date()}.csv`)
    const secrets = await utils.getSecrets(['headers', 'cookies'], pathPrefix = "secret/data")

    // Convert from Array of (Object of Object) to Array of Object 
    const secretList = secrets.flatMap((secret) => {
        return Object.entries(secret).flatMap(([_, v]) => {
            return Object.entries(v).flatMap(([key, value]) => {
                return { enabled: true, key: key, value: value, type: "text" }
            })
        })
    })

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
            value: 28,
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
        reporters: ['cli', 'htmlextra'],
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
