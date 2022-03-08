const { program } = require('commander')

exports.fetchCliArgs = () => {
    program.requiredOption(
        '-f, --file <value>',
        'Path to postman collection file',
    )
    program.parse()
    return program.opts()
}