import { E_EncodingTypes } from "@/constants/defaults";

export const ENCODING_TYPES: T_EncodingTypes[] = [
  { label: 'JSON Web Token (JWT)', value: E_EncodingTypes.JWT, group: 'text' },
  { label: 'URL', value: E_EncodingTypes.URL, group: 'text' },
  { label: 'Base64', value: E_EncodingTypes.base64, group: 'file' },
  { label: 'Base32', value: E_EncodingTypes.base32, group: 'file' }
]

export const EXAMPLE_JWT_HEADER = `{\n  "alg": "RS256",\n  "typ": "JWT"\n}`

export const EXAMPLE_JWT_CLAIM = `{\n  "jti": "96492d59-0ad5-4c00-892d-590ad5ac00f3",\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1681040515\n}`