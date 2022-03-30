## Usage

### Prerequisites
#### Setup Vault:
A local vault setup should be setup (or the vault server should be running with the specified credentials).

Run the local vault setup (make sure vault is already installed on local machine):
```
vault server -dev 
```

Vault needs to contains the following keys:
```
secret/cookies -> {session, session.sig}
secret/header -> {x-1mg-csrf}
secret/files -> {create_order_file}
```

Example of `secret/files`:
```json
{
  "create_order_file": [
    {
      "Discount% on MRP": 10,
      "Quantity": 8,
      "SKU ID": "156242",
      "SKU Name": "Dexorange Capsule - bottle (30)"
    }
  ]
}
```

#### Setup the environment variables:
Copy the `.env.example` file to `.env` and modify the values:
```
cp .env.example .env
```
and add the vault token to the `.env` file as `VAULT_TOKEN`

#### Install Node:
Install nodejs and npm on mac:
- Using brew:
```sh
brew install node
```

#### Installing dependencies:
Install the node dependencies using npm:
```sh
npm install
```

#### Running the script:
Run the `src/index.js` using `node`:

```sh
node src -f <collection_file_path>
```

Example:
```sh
node src -f Odin.postman_collection.v2.json
```