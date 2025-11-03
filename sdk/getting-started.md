---
sidebar_position: 1
---

# Getting Started

:::danger Temporary Chat Wallets Only (For now)
This SDK version is designed for temporary chat wallets. Use private keys used **for chat purposes only** - never enter your personal wallet keys or accounts containing funds. Future versions will support connected wallets and enable safe signing without exposing private keys.
:::


Welcome to the **Moki SDK** - a fast, lightweight SDK for building Web3 chat applications with end-to-end encryption.

## Overview

The Moki SDK provides everything you need to integrate encrypted wallet-to-wallet messaging into your application. Built for EVM accounts, it offers a simple API while handling all the complexity of encryption, signing, and blockchain interactions.

## Installation

Install the Moki SDK using your preferred package manager:

```bash
# npm
npm install @moki-chat/core

# pnpm
pnpm install @moki-chat/core

# yarn
yarn add @moki-chat/core
```

## Quick Start

Here's a complete example to send your first encrypted message using a **temporary wallet**:

```typescript
import { generatePrivateKey } from 'viem/accounts'
import { privateKeyToMokiAccount } from '@moki-chat/core/accounts'
import { createMessageClient } from '@moki-chat/core/messaging'
import { createProvider } from '@moki-chat/core/provider'

// 1. Connect to a Moki node
const provider = createProvider("https://moki-node.pingify.io")

// 2. Generate a NEW temporary wallet (or retrieve from localStorage)
const tempPrivateKey = generatePrivateKey() // Creates a fresh wallet
const account = privateKeyToMokiAccount(tempPrivateKey)

console.log('Temporary chat wallet:', account.address)

// 3. Create a message client
const messageClient = createMessageClient(provider, {
  account,
  dangerouslyUseAccountAsDelegate: true // OK for temporary wallets
})

// 4. Send a message
await messageClient.sendMessage("alice", "Hello World!")

// 5. Get chat history
const chat = await messageClient.getLatestChat("alice")
console.log(chat.data)
```

:::tip Storing Temporary Wallets
For a persistent chat identity across sessions, store the temporary key in localStorage:

```typescript
function getOrCreateChatWallet() {
  let key = localStorage.getItem('tempChatKey')
  if (!key) {
    key = generatePrivateKey()
    localStorage.setItem('tempChatKey', key)
  }
  return privateKeyToMokiAccount(key as `0x${string}`)
}
```
:::

## Basic Concepts

### Provider

The **Provider** connects your application to a Moki node, handling all RPC communication:

```typescript
const provider = createProvider("https://moki-node.pingify.io")
```

### Account

An **Account** represents a user's identity and cryptographic keys. For this SDK version, always generate a new temporary wallet:

```typescript
import { generatePrivateKey } from 'viem/accounts'

const tempKey = generatePrivateKey()
const account = privateKeyToMokiAccount(tempKey)
```

### Message Client

The **Message Client** is your main interface for sending and receiving messages:

```typescript
const messageClient = createMessageClient(provider, {
  account,
  dangerouslyUseAccountAsDelegate: true
})
```

:::info
The `dangerouslyUseAccountAsDelegate` option is perfectly safe for temporary chat wallets since they contain no real funds. This option is only "dangerous" if used with your personal wallet keys (which you should never do with this SDK version).
:::

## Need Help?

- Check out the [GitHub repository](https://github.com/Web3Dave/moki-sdk)
