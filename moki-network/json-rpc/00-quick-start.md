# Quick Start

This quickstart guide will help you set up and make calls on the moki network using our public node.

## Make calls

### curl

Run the following command in your terminal:

```bash
curl https://mainnet.moki.network/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "moki_blockNumber", "params": [], "id": 1}'
```

### Node (JavaScript)

In these examples, you'll use [npm](https://npmjs.com) as your package manager.

#### Node Fetch

1) In your project folder, install the node-fetch package using npm:

```bash
npm i node-fetch
```

2) Create your JavaScript file and copy the following code:

```javascript
import fetch from "node-fetch"

fetch("https://mainnet.moki.network", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "moki_blockNumber",
    params: [],
    id: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

3) Run the code using the following command:

```bash
node index.js
```