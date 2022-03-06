require('dotenv').config()
const newman = require('newman')
const { program } = require('commander')

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
        ...secretList
    ]

    newman.run({
        collection: "/Users/shaurya/Documents/testing/Node-Automate/Odin.postman_collection.json",
        envVar: envVars,
        reporters: 'cli'
    }, (error) => {
        if (error) throw error
        console.log("success")
    })
}

index()