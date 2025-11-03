---
sidebar_position: 3
---

# Messaging

The Messaging module provides the high-level Message Client for sending and receiving encrypted messages.

## Functions

### `createMessageClient`

Creates a message client for interacting with the Moki network.

```typescript
function createMessageClient(
  provider: MokiProvider,
  options: MessageClientOptions
): MessageClient
```

#### Parameters

- **provider**: `MokiProvider` - Provider instance connected to a Moki node
- **options**: `MessageClientOptions` - Client configuration

#### Options

```typescript
type MessageClientOptions = {
  // Required: Account that owns the messages (use temporary wallet only!)
  account: MokiAccount

  // Optional: Separate account for signing operations
  delegateAccount?: MokiAccount

  // Safe for temporary wallets - uses main account as delegate
  dangerouslyUseAccountAsDelegate?: boolean
}
```

:::danger Temporary Wallets Only
Always use `dangerouslyUseAccountAsDelegate: true` with **temporary chat wallets only**. Never use your personal wallet keys with this SDK version.
:::

#### Returns

`MessageClient` instance

#### Example

```typescript
import { generatePrivateKey } from 'viem/accounts'
import { createMessageClient } from '@moki-chat/core/messaging'
import { createProvider } from '@moki-chat/core/provider'
import { privateKeyToMokiAccount } from '@moki-chat/core/accounts'

const provider = createProvider("https://moki-node.pingify.io")

// Generate a temporary wallet
const tempKey = generatePrivateKey()
const account = privateKeyToMokiAccount(tempKey)

const messageClient = createMessageClient(provider, {
  account,
  dangerouslyUseAccountAsDelegate: true // OK for temporary wallets!
})
```

## MessageClient Methods

### `sendMessage`

Sends an encrypted message to a user.

```typescript
async sendMessage(
  username: string,
  message: string
): Promise<MokiMessage>
```

#### Parameters

- **username**: `string` - Recipient's username
- **message**: `string` - Plain text message to send

#### Returns

Promise resolving to the sent `MokiMessage`

#### Example

```typescript
const sentMessage = await messageClient.sendMessage(
  "alice",
  "Hello, Alice!"
)

console.log("Message ID:", sentMessage.id)
console.log("Sent at:", new Date(sentMessage.timestamp * 1000))
```

#### Throws

- Username not found
- Network errors
- Encryption errors

---

### `getLatestChat`

Retrieves message history with a user.

```typescript
async getLatestChat(
  username: string,
  offset?: number,
  limit?: number
): Promise<{ data: MokiMessage[], end: boolean }>
```

#### Parameters

- **username**: `string` - Username to get chat with
- **offset**: `number` - Starting offset (default: 0)
- **limit**: `number` - Maximum messages to fetch (default: 50)

#### Returns

Promise resolving to:
- **data**: `MokiMessage[]` - Array of messages
- **end**: `boolean` - True if no more messages available

#### Example

```typescript
const chat = await messageClient.getLatestChat("alice")

chat.data.forEach(msg => {
  const time = new Date(msg.timestamp * 1000).toLocaleString()
  console.log(`[${time}] ${msg.sender}: ${msg.payload.message}`)
})

if (!chat.end) {
  console.log("More messages available")
}
```

#### Pagination

```typescript
// Get first 20 messages
const page1 = await messageClient.getLatestChat("alice", 0, 20)

// Get next 20 messages
const page2 = await messageClient.getLatestChat("alice", 20, 20)
```

---

### `watchChat`

Watches for new messages in real-time.

```typescript
watchChat(
  username: string,
  callback: (messages: MokiMessage[]) => void
): () => void
```

#### Parameters

- **username**: `string` - Username to watch chat with
- **callback**: `(messages: MokiMessage[]) => void` - Called when new messages arrive

#### Returns

Function to stop watching (cleanup function)

#### Example

```typescript
const unwatch = messageClient.watchChat("alice", (newMessages) => {
  newMessages.forEach(msg => {
    console.log("New message:", msg.payload.message)
    // Update UI, play sound, etc.
  })
})

// Later: stop watching
unwatch()
```

#### React Integration

```typescript
useEffect(() => {
  const unwatch = messageClient.watchChat("alice", (messages) => {
    setMessages(prev => [...prev, ...messages])
  })

  return () => unwatch()
}, [])
```

---

### `getIdentityFromUsername`

Looks up a user's identity by username.

```typescript
async getIdentityFromUsername(
  username: string
): Promise<MokiRPCIdentity | undefined>
```

#### Parameters

- **username**: `string` - Username to look up

#### Returns

Promise resolving to `MokiRPCIdentity` or `undefined` if not found

#### Example

```typescript
const identity = await messageClient.getIdentityFromUsername("alice")

if (identity) {
  console.log("Username:", identity.payload.username)
  console.log("Public Key:", identity.public_key)
  console.log("Service Node:", identity.payload.service_identity)
} else {
  console.log("User not found")
}
```

---

### `getIdentityFromAddress`

Looks up a user's identity by Ethereum address.

```typescript
async getIdentityFromAddress(
  address: `0x${string}`
): Promise<MokiRPCIdentity | undefined>
```

#### Parameters

- **address**: `0x${string}` - Ethereum address to look up

#### Returns

Promise resolving to `MokiRPCIdentity` or `undefined` if not found

#### Example

```typescript
const identity = await messageClient.getIdentityFromAddress(
  "0xf39..."
)

if (identity) {
  console.log("Found user:", identity.payload.username)
}
```