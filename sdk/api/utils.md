---
sidebar_position: 4
---

# Utils

The Utils module provides low-level cryptographic functions and utilities for advanced use cases.

## Encryption Functions

### `deriveECDHSecret`

Derives a shared ECDH secret for encryption between two parties.

```typescript
async function deriveECDHSecret(
  privateKey: `0x${string}`,
  publicKey: `0x${string}`
): Promise<Uint8Array>
```

#### Parameters

- **privateKey**: `0x${string}` - Your private key
- **publicKey**: `0x${string}` - Other party's public key (compressed or uncompressed)

#### Returns

Promise resolving to SHA-256 hashed shared secret (32 bytes)

#### Example

```typescript
import { deriveECDHSecret } from '@moki-chat/core/utils'

const myPrivateKey = "0x..."
const theirPublicKey = "0x04..."

const sharedSecret = await deriveECDHSecret(myPrivateKey, theirPublicKey)
console.log(sharedSecret) // Uint8Array(32)
```

---

### `encryptWithECDHSecret`

Encrypts content using AES-GCM with a shared secret.

```typescript
async function encryptWithECDHSecret(
  sharedSecret: Uint8Array,
  content: string
): Promise<string>
```

#### Parameters

- **sharedSecret**: `Uint8Array` - Derived ECDH shared secret (32 bytes)
- **content**: `string` - Plain text to encrypt

#### Returns

Promise resolving to encrypted hex string: `IV (12 bytes) + AuthTag (16 bytes) + Ciphertext`

#### Example

```typescript
import {
  deriveECDHSecret,
  encryptWithECDHSecret
} from '@moki-chat/core/utils'

const secret = await deriveECDHSecret(myPrivateKey, theirPublicKey)
const encrypted = await encryptWithECDHSecret(secret, "Secret message")

console.log(encrypted) // 0x...
```

#### Encryption Details

- **Algorithm**: AES-GCM
- **Key**: Shared secret (32 bytes)
- **IV**: Random 12 bytes
- **Tag Length**: 128 bits (16 bytes)
- **Output Format**: Hex string with IV + Tag + Ciphertext

---

### `decryptWithECDHSecret`

Decrypts content encrypted with AES-GCM.

```typescript
async function decryptWithECDHSecret(
  sharedSecret: Uint8Array,
  encryptedHex: string
): Promise<string>
```

#### Parameters

- **sharedSecret**: `Uint8Array` - Derived ECDH shared secret (32 bytes)
- **encryptedHex**: `string` - Encrypted hex string (from `encryptWithECDHSecret`)

#### Returns

Promise resolving to decrypted plain text

#### Example

```typescript
import {
  deriveECDHSecret,
  decryptWithECDHSecret
} from '@moki-chat/core/utils'

const secret = await deriveECDHSecret(myPrivateKey, theirPublicKey)
const decrypted = await decryptWithECDHSecret(secret, encryptedHex)

console.log(decrypted) // "Secret message"
```

#### Throws

- Invalid encrypted data format
- Authentication tag verification failed
- Decryption errors

---

## Public Key Functions

### `compressPublicKey`

Compresses an uncompressed secp256k1 public key.

```typescript
function compressPublicKey(
  uncompressedKey: `0x${string}`
): `0x${string}`
```

#### Parameters

- **uncompressedKey**: `0x${string}` - Uncompressed public key (65 bytes: 0x04 + X + Y)

#### Returns

Compressed public key (33 bytes: 0x02/0x03 + X)

#### Example

```typescript
import { compressPublicKey } from '@moki-chat/core/utils'

const uncompressed = "0x04..." // 65 bytes
const compressed = compressPublicKey(uncompressed)

console.log(compressed.length) // 66 (33 bytes * 2 + 2 for 0x)
```

---

### `decompressPublicKey`

Decompresses a compressed secp256k1 public key.

```typescript
function decompressPublicKey(
  compressedKey: `0x${string}`
): `0x${string}`
```

#### Parameters

- **compressedKey**: `0x${string}` - Compressed public key (33 bytes)

#### Returns

Uncompressed public key (65 bytes: 0x04 + X + Y)

#### Example

```typescript
import { decompressPublicKey } from '@moki-chat/core/utils'

const compressed = "0x02..." // 33 bytes
const uncompressed = decompressPublicKey(compressed)

console.log(uncompressed.length) // 130 (65 bytes * 2 + 2 for 0x)
console.log(uncompressed.startsWith('0x04')) // true
```