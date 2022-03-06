const vault = require('node-vault')({
    apiVersion: "v1",
    endpoint: process.env.VAULT_ENDPOINT,
    token: process.env.VAULT_TOKEN
})

/**
 * Fetch secrets from vault
 * 
 * @param {Array} paths Paths to fetch the secret from
 * @param {String} pathPrefix (Optional) Prefix to put before each path
 * @returns {Array} Array of all the secrets stored
 */
exports.getSecrets = async (paths, pathPrefix = "") => {
    const promises = paths.map(async (path) => {
        const { data: { data: secret } } = await vault.read(`${pathPrefix}/${path}`)
        return { [path]: secret }
    })

    const secrets = await Promise.all(promises).then((secret) => {
        return secret
    })

    return secrets
}