# Database

## Keys
The following data structures are stored using RocksDB.

`block(00):{block_hash} - [block_info(ts), tx_hash, ...]`

`transaction(01):{tx_hash} - tx_info`

`block_number(02):{block} - block_hash`

`identity(03):{identity}`

`service(04):{identity}`

`service_proof(05):{identity}:{rollup_day} - merkle_root`

`nonce(06):{identity} - currentNonce`

### Optional - Indexing

`tx_in:{identity}:{block_number}:{tx_hash} - 0`

`tx_out:{identity}:{nonce} - tx_hash`

### Values:

`block_hash` - Block Hash

`block` - Block Number, begins with 0 for genesis

`identity` - Address / Identifier (Can be for service or wallet)

`tx_hash` - Transaction Hash

`nonce` - Identity Nonce

`rollup_day` - 
