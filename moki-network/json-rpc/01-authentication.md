# Authentication

For service nodes, access is restricted to only the identity owner. Even though all messages are E2E encrypted, you will still not be able to access another inbox.

## How does it work

Traditional systems provide an authentication entry for fetching and refetching a Bearer token (Authentication Token).

To prevent additional requests and keep the computational power minimal, a signed message is provided in the header instead. This is then stored in a secure cache lookup against the users address. The signature must contain the following

`[identity, dayInteger]`

- **identity**: Lookup for deligateKey (signer of Auth token)
- **dayInteger**: Ensures expiry is built in (token must be created again for each day and cache must respect expirey value)