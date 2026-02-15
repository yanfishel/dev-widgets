import React from "react";
import * as jose from "jose";

import { ENCODING_TYPES } from "@/constants";
import {T_Algorithms, T_EncodingOption} from "@/types/dev-utils";


export const encodingSelectOptions = () => {
  const optGroups: T_EncodingOption[] = []
  ENCODING_TYPES.forEach(type => {
    const existIndex = optGroups.findIndex(group => group.type === type.group)
    if(existIndex === -1) {
      optGroups.push({
        type: type.group,
        options: [ type ]
      })
    } else {
      optGroups[existIndex].options.push(type)
    }
  })
  return optGroups
}

export const textareaValue = (event:React.SyntheticEvent<HTMLTextAreaElement>) =>{
  const { value } = event.target as HTMLTextAreaElement
  return value.replace(/\s/g, '').trim()
}

export const jwtDecodeHeader = (text:string) =>{
  try {
    const header = jose.decodeProtectedHeader(text)
    return JSON.stringify(header, null, 2)
  } catch (e) {
    console.log('Invalid JWT Header', e)
  }
}

export const jwtDecode = (text:string) =>{
  try {
    const decoded = jose.decodeJwt(text)
    return JSON.stringify(decoded, null, 2)
  } catch (e) {
    console.log('Invalid JWT', e)
  }
}

export const jwtEncode = async (header:string, claim:string, secret:string, alg:T_Algorithms) => {
  const obj = JSON.parse(claim)
  const protectedHeader = JSON.parse(header)
  let signSecret:Uint8Array|CryptoKey = new TextEncoder().encode(secret)
  if(alg.startsWith('RS')) {
    signSecret = await jose.importPKCS8(secret, alg)
  }
  return await new jose.SignJWT(obj)
    .setProtectedHeader( protectedHeader)
    .setIssuedAt()
    //.setExpirationTime('2h')
    .sign(signSecret)
}

export const jwtVerify = async (text:string, signSecret:string) => {
  try {
    const secret = new TextEncoder().encode(signSecret)
    const verified = await jose.jwtVerify(text, secret)
    return !!verified
  } catch (e) {
    console.log('Invalid JWT', e);
    return false
  }
}


export const validNamedField = (name:string, value:string) => {
  const parsedValue = parseInt(value)
  let isValid = !isNaN(parsedValue)
  switch (name) {
    case 'year': isValid = parsedValue >= 1970 && parsedValue <= 9999; break;
    case 'month': isValid = parsedValue >= 1 && parsedValue <= 12; break;
    case 'day': isValid = parsedValue >= 1 && parsedValue <= 31; break;
    case 'hour': isValid = parsedValue >= 0 && parsedValue <= 23; break;
    case 'minute': isValid = parsedValue >= 0 && parsedValue <= 59; break;
    case 'second': isValid = parsedValue >= 0 && parsedValue <= 59; break;
    default: break;
  }
  return isValid
}

export const validField = (event:KeyboardEvent|InputEvent|Partial<InputEvent>) => {
    const target = event.target as HTMLInputElement
    const name = target.name;
    const parsedValue = parseInt(target.value)
    return validNamedField(name, parsedValue.toString())
}