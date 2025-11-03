---
sidebar_position: 2
---

# Provider

The Provider module handles communication with Moki nodes via JSON-RPC.

## Functions

### `createProvider`

Creates a provider instance for communicating with a Moki node.

```typescript
function createProvider(rpcUrl: string): MokiProvider
```

#### Parameters

- **rpcUrl**: `string` - URL of the Moki RPC node

#### Returns

`MokiProvider` instance

#### Example

```typescript
import { createProvider } from '@moki-chat/core/provider'

const provider = createProvider("https://moki-node.pingify.io")
```

## Provider Methods

### `request`

Makes an RPC request to the Moki node.

```typescript
const result = await provider.request<ReturnType>({
  method: MOKI_RPC_METHODS.ETH_GET_BLOCK,
  params: [],
  authorizationHeader: "0x..." // Optional
})
```

#### Parameters

- **method**: `MOKI_RPC_METHODS` - The RPC method to call
- **params**: `unknown[]` - Array of parameters for the method (optional)
- **authorizationHeader**: `0x${string}` - Authorization signature (required for some methods)

#### Returns

Promise resolving to the method's return value (type `T`)

## Usage Examples

### Basic Provider Setup

```typescript
import { createProvider } from '@moki-chat/core/provider'

const provider = createProvider("https://moki-node.pingify.io")
```

### Looking Up an Identity

```typescript
const identity = await provider.request({
  method: MOKI_RPC_METHODS.MOKI_GET_IDENTITY_BY_USERNAME,
  params: ["alice"]
})

console.log(identity) // MokiRPCIdentity object
```