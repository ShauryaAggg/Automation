const { program } = require('commander')

exports.fetchCliArgs = () => {
    program.option(
        '-f, --file <value>',
        'Path to postman collection file',
        '/Users/shaurya/Documents/testing/Node-Automate/Odin.postman_collection.json'
    )
    program.parse()
    return program.opts()
}