---
sidebar_position: 1
---

# Accounts

The Accounts module provides functions for creating and managing Moki accounts from Ethereum private keys.

## Functions

### `privateKeyToMokiAccount`

Creates a Moki account from a private key.

```typescript
function privateKeyToMokiAccount(
  privateKey: `0x${string}`
): MokiAccount
```

#### Parameters

- **privateKey**: `0x${string}` - Hexadecimal private key string (64 hex characters + `0x` prefix)

#### Returns

`MokiAccount` object with the following properties:

```typescript
interface MokiAccount {
  address: `0x${string}`
  publicKey: `0x${string}`
  signMessage: (message: { message: SignableMessage }) => Promise<`0x${string}`>
  deriveECDHSecret: (publicKey: `0x${string}`) => Promise<Uint8Array>
}
```

#### Example

```typescript
import { privateKeyToMokiAccount } from '@moki-chat/core/accounts'

const account = privateKeyToMokiAccount(
  "0xac09..."
)

console.log(account.address)   // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
console.log(account.publicKey) // 0x04...
```