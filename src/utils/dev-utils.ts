import React from "react";
import * as jose from "jose";

import {ENCODING_TYPES} from "@/constants";


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