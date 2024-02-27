# Usage

```ts
import MessageEncoder from "expo-symbol-encrypt-message";
import { Account, NetworkType } from "symbol-sdk";

const alice = Account.createFromPrivateKey('ALICE_PRIVATE_KEY', NetworkType.TEST_NET);
const bob = Account.createFromPrivateKey('BOB_PRIVATE_KEY', NetworkType.TEST_NET);

const messageEncoder = new MessageEncoder(alice.privateKey);
const messageDecoder = new MessageEncoder(bob.privateKey);

const encoded = messageEncoder.encode(bob.publicKey, 'Hello, symbol!');
console.log('encoded: ', encoded);
const decoded = messageDecoder.tryDecode(alice.publicKey, encoded);
console.log('decoded: ', decoded);
```
symbol-sdkを使わない場合でもMessageEncoderの引数にUint8Arrayもしくはhexadecimal stringを渡せばEncode, Decode共に行えます。上記はあくまでも例として`symbol-sdk@2`を使用するケースのサンプルです。
