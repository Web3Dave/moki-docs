---
sidebar_position: 0
---

# Overview

Moki is a hybrid, dual-layer blockchain system designed for lightweight, **VERY** scalable, privacy-preserving messaging. Its architecture separates verification and delivery into two complementary layers:

The core design allows for scalable, verifiable messaging while keeping the network lightweight, enabling users to retain ownership of their message streams and ensuring that all actions are provably recorded on the verification chain.

## Layer 1 – Audit Chain:

This layer maintains linear hashes of wallet message streams and the service nodes selected by each wallet. It does not store message content, but instead acts as an immutable audit trail, confirming that all messages processed by service nodes are verifiable and tamper-resistant.

## Layer 2 – Service Nodes:

Service nodes operate as message service providers, handling the majority of message delivery for efficiency and speed. Each wallet is associated with a service node, which receives, routes, and delivers messages, while updating the wallet’s local message stream. Push notifications and inbox updates are handled at this layer.

