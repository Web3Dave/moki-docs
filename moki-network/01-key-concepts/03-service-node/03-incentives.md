# Incentives

To encourage service nodes to operate, a form of incentive has to be given. The incentives for a service node are tailered towards the following:

- Long message persistance:
    - **Persistance reward**: The longer a service is promised as message persist commitment, the more reward at the end of a completed period, but also the longer a node has to wait for the full reward. Could possibly reward in partition.
- Genuine users:
    - **Gas fee commision**: A user linked to a service gives a percentage of their gas fee to the service node. The more authentic users a service node has, the more profitable it is.
- Genuine Merkle Tree submissions:
    - **Service Node Checks:** The consensus will randomly and deterministically pick a service node message based on the weight of active message count submissions (along with the merkle tree roots). The selected service node has to respond with the merkle proof for the hash. Faking a merkle tree root or synthetically creating hashes requires a lot of storage and work to do so, this would not be of any value for a node and would increase storage costs.
    - **Identity Message Check (Symbiotic Rewarding):** If a users message is selected via the consensus they have the option to disclose the encrypted content to the chain for a reward. The reward is split between the Service node and the Identity. This incentivices the Service nodes to only submit full messages to the audit chain. **However**, the chance for this is not weighted linearly, instead it is a *logarythmic* chance based on the `f(participants,messages,gas_fee_commisions)` value. This minimises the reward for fakers (they would need to run many seperate service nodes with fake wallets/messages for a long period) whilst keeping incentive for genuine service nodes, having responsive users that claim their lottery rewards is rewarded to the service node also.

## How does this balance out?

The possibilities for malicious use of incentives are as follows:

**Create many service nodes with fake identities and lots of fake messages to maximise chance of Identity message check**
- High costs for registering identities on chain
- High costs for maintaining seperate service nodes with long commitments
- Lack of gas fee commision minimises Identity check reward

**Create a service node with lots of fake identities and messages**
- Impressive stats onchain
- High registration cost for fake identities
- High storage / calculation cost to keep message proofs
- Identity checks capped 
- No reward for gas fee commision
- Lack of gas fee commision minimises Identity check reward

**Create a service node with lots of fake identities and few messages**
- High registration cost for fake identities
- No reward for gas fee commision
- Lack of gas fee commision minimises Identity check reward

**Create a service node with lots of fake identities, messages and transactions onchain**
- Impressive stats onchain
- High registration cost for fake identities
- High storage / calculation cost to keep message proofs
- Significant loss due to onchain gas fee commision
- Identity check rewards maximised but the cost of gas fees cancels out the reward