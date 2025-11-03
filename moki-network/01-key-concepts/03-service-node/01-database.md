# Database

## Keys
The following data structures are stored using RocksDB.

`message(100):{ts_msg_id}`

`stream(101):{identity}:{ts_msg_id}`

`channel(102):{channel_id}:{ts_msg_id}`

`notification_service(103):{identity} - [NotificationService, IdToken]`

`archive_message(104):{ts_msg_id}` *Messages that migrated from a previous service_node*

## Values

**MessagePayload**

```rust
pub struct MokiSendMessageV1 {
    pub timestamp: u8, // Prevents replay attacks, must be within 30s of server time
    pub recipient: [u8; 20], // Identity of recipient
    #[codec(compact)]
    pub message: [u64], // encrypted message payload
}
```