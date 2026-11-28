export const PASSWORD_ALPHABET="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";
export function generatePassword(length=20,random:Pick<Crypto,"getRandomValues">=crypto){
  if(!Number.isInteger(length)||length<8||length>128)throw Error("Choose a length from 8 to 128.");
  const ceiling=Math.floor(256/PASSWORD_ALPHABET.length)*PASSWORD_ALPHABET.length;
  let out="";
  while(out.length<length){const bytes=random.getRandomValues(new Uint8Array(64));for(const byte of bytes){if(byte>=ceiling)continue;out+=PASSWORD_ALPHABET[byte%PASSWORD_ALPHABET.length];if(out.length===length)break;}}
  return {password:out,entropy:Math.floor(length*Math.log2(PASSWORD_ALPHABET.length))};
}
