# Offchain messages

The end goal for Moki is wide scale adoption. Never having to pick a message service again, simply being able to migrate.

A truly decentralised messaging blockchain where each message is stored on multiple nodes is possible but has the following constraints:

- Speed: With traffic the size of current messaging services, propogating these messages across a network would bring it to a halt.
- Size: Storing each message on a single blockchain would make nodes heavier and more costly to run. In order to maintain this incentives would have to be exceptionally high to keep a decentralised system live.
- Privacy: Even with identity being hidden, transaction metadata is exposed.

To solve these issue we have replaced the decentralisation at the message level with **accountability** and **portability**. Users will be able to change service node providers and move their messages with them.

## Recipient Offloading

For scenarios where a person wants to message another without registering an account on the audit chain, service nodes can support recipient offloading.

This can be a useful feature for projects like [Pingify.io](https://pingify.io) where user onboarding has to be invisible when being used in temporary scenarios.

### How does it work?

If you know the service node linked to a recipient you can message them without reistering your wallet on the audit chain and fetch historical messages directly via the stored chat. The sender will not hold a personal inbox, however, they will be able to persist and send messages to a user lnked to the service node. This offloads the linking requirement to the recipient.

:::info
By not linking your identity on the audit chain the service node is not held accountable for migrations
:::