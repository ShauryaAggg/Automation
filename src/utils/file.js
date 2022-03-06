const fs = require('fs')
const path = require('path')

/**
 * Write the file with the given data
 * 
 * @param {String} filePath Path to write the file to
 * @param {Object} data data to write in the file
 */
exports.exportFile = (filePath, data) => {
    if (!fs.existsSync(__dirname + filePath)) {
        const parent = path.dirname(filePath)
        console.log(parent)
        fs.mkdirSync(parent, { recursive: true })
    }

    fs.writeFile(filePath, data, (err) => {
        if (err) throw err
    })
}