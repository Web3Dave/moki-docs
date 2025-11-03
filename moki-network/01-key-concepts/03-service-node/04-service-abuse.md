# Service Abuse

In the scenario where a user abuses a service, the service has a few options depending on the type of abuse:

- **DDOS**: Sending many message requests in fast sequence to overload the service
    - Rate limit and do not respond with messages.

- **Community Guidelines**: Abusive messages, Scams
    - User submits the message ids along with the linked ephemeral shared key to the service (allows decryption of one message without granting decryption of the others), revealing the message content and signed proofs of the sender, the service can review the messages and decide to deny further service to the subject who violated community guidelines. The subject then has the ability to change service but the service can then deny access.