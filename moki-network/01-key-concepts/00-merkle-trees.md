# Merkle Trees

When creating a hybrid messaging blockchain that combines private service nodes for message metadata privacy, one particular challenge is presented:

> How do you make sure a service node is behaving as promised?

This is where Merkle Trees shine.

## What is a merkle tree

In short, a merkle tree is a way to prove the inclusion of a piece of data within a small value. This small value is about 32 bytes but can be used to prove the inclusion of infinite data.

This small value is called a merkle tree root.

## Service Node Rollups

The merkle tree root for each Service Node is calculated at the end of each 24 hour period using the message hashes from that time range. This is then submitted to the audit chain within the 24 hour grace period. A service node can be queried by the chain at intervals to provide the merkle tree proof of that specific randomly determined message.

Merkle Proofs are calculated in the following way.

1) Select messages for range in 24 hour period
2) Generate Merkle Tree Root for all messages in that batch, using their already indexed IDs to determine tree position.
3) Store the top half of the tree (from root node)
4) Submit the root to the audit chain

Once a merkle proof is required the service node must do the following:

1) Leaf node is given (hash of the serialised message content)
2) Calculate the branch hashes for the bottom half towards the leaf
3) With the combined root, branches and leaf node for that day, generate the merkle proof.

The stored branch hashes can be adjusted based on the storage or computational preferences of the service node.

Using the half way approach you can reduce the computational and storage requirements of a 10,000,000 message in a day example with the following:

- Storage (~153 KB for top-half branches)
- Computation (~4,083 hashes per proof)
- Estimated time < 0.2s for basic EC2 instance (To be confirmed, currently just estimate)

## Service Node Reliability Incentive

Each service node can stake Moki tokens. The amount of Moki tokens allowed/or usefull depends on the amount of wallets linked to the service. The staked tokens increase their cut of gas fees on activities from wallets that are linked to the service.

### Submitting a claim

When you send a message you receive a receipt, a signed proof that the storage node has stored your message and promises to keep it available for a set period of time.

If you are not able to fetch your messages from a service node and believe that the service node is not storing your messages as promised in the receipt. You can submit a claim using the `moki_submitClaim` on a locally stored message (including service node receipt).

This submission goes to the audit chain, which requests a challenge on the service node. If the service node is not able to proove `serialisedMessage -> messageHash -> merkleTreeRoot` within a set period of time, then a percentage of the staked tokens will be automatically deposited to the wallet.

### Spam claiming

*The scenario in which a malicious actor tries to spam a service node by creating many wallets and messages to overload the node in the hope of bringing it offline for the claim period.*

Protections can be made through the following:
- Message/wallet/ip throttling

### Blocked Service

*The scenario in which a malicious service decides to prevent a wallet from sending a message or receiving one but keeps its service available to challenges on the network, preventing a claim from completing*

This can be prevented through:

1) User submits a timestamp permission to `moki_submitClaim` along with the expected result, the timestamp permission allows the validators to fetch/submit on behalf of the user without being able to decrypt the E2EE messages.
2) The chain deterministically selects a few connected top level validators to run this check and return the values. This can be a timestamp permission for a message sending or fetching multiple messages.
3) If most of the validators can not fetch the information within a set period then the staking penalty is deposited to the claimant and top level validators.
