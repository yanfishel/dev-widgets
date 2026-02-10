
export enum E_EncodingTypes {
  JWT = 'JWT',
  URL = 'URL',
  base64 = 'base64',
  base32 = 'base32'
}

export const ENCODING_TYPES: T_EncodingTypes[] = [
  { label: 'JSON Web Token (JWT)', value: E_EncodingTypes.JWT, group: 'text' },
  { label: 'URL', value: E_EncodingTypes.URL, group: 'text' },
  { label: 'Base64', value: E_EncodingTypes.base64, group: 'file' },
  { label: 'Base32', value: E_EncodingTypes.base32, group: 'file' }
]