const { program } = require('commander')

/**
 * Sets the CLI Arguments and returns all the parsed arguments
 * 
 * @returns {Object} Key-Value pair of the parsed arguments 
 */
exports.fetchCliArgs = () => {
    program.requiredOption(
        '-f, --file <value>',
        'Path to postman collection file',
    )
    program.parse()
    return program.opts()
}