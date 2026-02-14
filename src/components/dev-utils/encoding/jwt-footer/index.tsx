import React, {memo} from 'react';

import { EXAMPLE_JWT_CLAIM, EXAMPLE_JWT_HEADER } from "@/constants";
import {useDevUtilsStore} from "@/store";
import JwtSignature from "../jwt-signature";

import './style.css'


const EncodingJwtFooter = () => {

  const onDecodedJWTChange = useDevUtilsStore(({onDecodedJWTChange}) => onDecodedJWTChange)

  const onExapleClickHandler = () => {
    useDevUtilsStore.setState(state => ({...state, decodedJWT: { ...state.decodedJWT, header:EXAMPLE_JWT_HEADER}} ))
    onDecodedJWTChange('claim', EXAMPLE_JWT_CLAIM)
  }

  return (
    <div className={'encode-footer'}>

      <button onClick={ onExapleClickHandler } className="signature-button" >Example</button>

      <JwtSignature />

    </div>
  )
}

export default memo(EncodingJwtFooter)