const file = require("./file")

/**
 * Convert an Array of object to CSV
 * 
 * @param {Array} data 
 *        Array of Object to convert into CSV
 * @param {String} filePath 
 *        (Optional) Path to write the file to
 * 
 * @returns {String} data
 *          String parsed from Object to CSV 
 * @returns {String} filePath
 *          Path of the file
 */
exports.convertToCSV = (data, filePath = "") => {
    const array = [Object.keys(data[0])].concat(data)

    const csv = array.map(it => {
        return Object.values(it).toString()
    }).join('\n')

    if (filePath != "") file.exportFile(filePath, csv)
    return { data: csv, filePath }
}
