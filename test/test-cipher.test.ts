import fs from 'fs';
import { deriveSharedKey } from '../src/sharedKey';
import { encodeAesGcm } from '../src/cipherHelpers';

const hexToUint8 = (hex: string) => {
  return new Uint8Array((hex ?? '').match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []);
};

const contents = fs.readFileSync(`${__dirname}/vectors/test-cipher.json`, { encoding: 'utf-8' });
const jsonMap = JSON.parse(contents);

for (let i = 0; i < jsonMap.length; i++) {
  test(`test_cipher_${i}`, async () => {
    const privateKey = hexToUint8(jsonMap[i]['privateKey']);
    const recipientPublicKey = hexToUint8(jsonMap[i]['otherPublicKey']);
    const clearText = hexToUint8(jsonMap[i]['clearText']);
    const iv = hexToUint8(jsonMap[i]['iv']);
    const result = encodeAesGcm(deriveSharedKey, privateKey, recipientPublicKey, clearText, iv);
    const tag = hexToUint8(jsonMap[i]['tag']);
    const cipherText = hexToUint8(jsonMap[i]['cipherText']);

    expect(result['tag']).toEqual(tag);
    expect(result['cipherText']).toEqual(cipherText);
  });
}
