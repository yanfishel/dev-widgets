import React, {memo, useCallback} from 'react';

import { EXAMPLE_JWT_CLAIM  } from "@/constants";
import {useDevUtilsStore} from "@/store";
import JwtSignature from "../jwt-signature";

import './style.css'


const EncodingJwtFooter = () => {

  const onDecodedJWTChange = useDevUtilsStore(({onDecodedJWTChange}) => onDecodedJWTChange)
  const signatureJWT = useDevUtilsStore(({signatureJWT}) => signatureJWT)

  const onExampleClickHandler = useCallback(() => {
    const header = JSON.stringify({alg: signatureJWT.algorithm, typ: 'JWT'}, null, 2)
    useDevUtilsStore.setState(state => ({...state, decodedJWT: { ...state.decodedJWT, header }} ))
    onDecodedJWTChange('claim', EXAMPLE_JWT_CLAIM)
  }, [signatureJWT.algorithm])

  return (
    <div className={'encode-footer'}>

      <button onClick={ onExampleClickHandler } className="signature-button" >Example</button>

      <JwtSignature />

    </div>
  )
}

export default memo(EncodingJwtFooter)