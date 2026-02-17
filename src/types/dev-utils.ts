import {E_SignatureAlgorithms, E_EncodingTypes} from "@/enums";
import {ColorTranslator} from "colortranslator";


export type T_EncodingType = `${E_EncodingTypes}`

export type T_EncodingTypes = {
  label: string,
  value: T_EncodingType,
  group: string
}

export type T_EncodingOption = {
  type: string,
  options: T_EncodingTypes[]
}

export type T_Algorithms = `${E_SignatureAlgorithms}`

export type T_DevUtilsStore = {

  processing: boolean
  selectedTab: number
  encodingType: T_EncodingType
  signatureJWT: { algorithm:T_Algorithms, secret:string, error:string }
  decodedJWT: { header:string, claim:string, error:string }
  encodedJWT: { text:string, error:string }
  decodedURL: { url:string, error:string }
  encodedURL: { text:string, error:string }
  decodedFile: { file:File | null, error:string }
  encodedFile: { text:string, error:string }
  reset: (encodingType?: T_EncodingType)=>void
  resetDecoded: (encodingType?: T_EncodingType)=>void
  resetEncoded: (encodingType?: T_EncodingType)=>void
  updateEncodingType: (encodingType:T_EncodingType)=>void
  onDecodedJWTChange: (field:string, code:string)=>void
  checkJWTSignature: (text:string)=>Promise<void>

  /*color: {
    instance: ColorTranslator | null,
    error: boolean
  }*/
  colorError: boolean
  inputColor: {
    Hex: string,
    Alpha: number,
    R: number,
    G: number,
    B: number
    A: number
  }
}