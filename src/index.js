require('dotenv').config()
const newman = require('newman')

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
    const [{ headers }, { cookies }] = await utils.getSecrets(['headers', 'cookies'], pathPrefix = "secret/data")

    const cookieList = Object.entries(cookies).map(([k, v]) => {
        return { enabled: true, key: k, value: v, type: "text" }
    })

    const headerList = Object.entries(headers).map(([k, v]) => {
        return { enabled: true, key: k, value: v, type: "text" }
    })

    envVars = [
        {
            enabled: true,
            key: "file_path",
            value: filePath,
            type: "text"
        },
        ...cookieList,
        ...headerList
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