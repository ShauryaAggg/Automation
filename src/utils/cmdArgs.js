const { program } = require('commander')

exports.fetchCliArgs = () => {
    program.option(
        '-f, --file <value>',
        'Path to postman collection file',
    )
    program.parse()
    return program.opts()
}