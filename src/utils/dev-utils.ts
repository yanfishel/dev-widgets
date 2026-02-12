import React from "react";
import * as jose from "jose";

import {DEFAULT_JWT_SECRET, ENCODING_TYPES} from "@/constants";


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

export const getEditableText = (event:React.SyntheticEvent<HTMLDivElement>) =>{
  const { textContent } = event.target as HTMLElement
  return textContent.replace(/\s/g, '').trim()
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

export const jwtEncode = async (header:string, claim:string, signSecret:string) => {
  try {
    const obj = JSON.parse(claim)
    const secret = new TextEncoder().encode(signSecret && signSecret !== '' ? signSecret : DEFAULT_JWT_SECRET)
    let protectedHeader = {alg:'HS256', typ: "JWT"}
    if(header) {
      protectedHeader = JSON.parse(header)
    }
    const jwt = await new jose.SignJWT(obj)
      .setProtectedHeader(protectedHeader)
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret)
    return jwt
  } catch (e) {
    console.log('Invalid JSON', e);
  }
}