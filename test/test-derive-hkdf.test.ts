import fs from 'fs';
import { deriveSharedKey } from '../src/sharedKey';

const hexToUint8 = (hex: string) => {
  return new Uint8Array((hex ?? '').match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []);
};

const contents = fs.readFileSync(`${__dirname}/vectors/test-derive-hkdf.json`, { encoding: 'utf-8' });
const jsonMap = JSON.parse(contents);

for (let i = 0; i < jsonMap.length; i++) {
  test(`test_derive_hkdf_${i}`, async () => {
    const privateKey = hexToUint8(jsonMap[i]['privateKey']);
    const otherPublicKey = hexToUint8(jsonMap[i]['otherPublicKey']);
    expect(new Uint8Array(deriveSharedKey(privateKey, otherPublicKey))).toEqual(hexToUint8(jsonMap[i]['sharedKey']));
  });
}
