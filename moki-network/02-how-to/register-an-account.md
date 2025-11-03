# Creating an identity

Identities on the Moki chain are tied to wallets. 

## Setting a deligate identity

Each wallet identity can submit a deligate identity to the network to act on their behalf. Although optional, this is an important feature as it can minimise the risk for the users private key leakage and acocunt recovery by keeping the message signing and decrypting keys seperate from the original account keys.

The setting o

`Deligate Identity`: A wallet that acts on behalf of the account owner, messages sent to the identity will use the deligate identity public key for E2EE (end to end encryption)