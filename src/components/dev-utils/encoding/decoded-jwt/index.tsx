import React, { useMemo } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import { useDevUtilsStore } from "@/store";
import '@/styles/code.css'
import './style.css'


const DecodedJWT = () => {

  const decodedJWT = useDevUtilsStore(({decodedJWT}) => decodedJWT)
  const onDecodedJWTChange = useDevUtilsStore(({onDecodedJWTChange}) => onDecodedJWTChange)

  const editorStyle = useMemo(() => ({
    width: '100%', minHeight: '100%',
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: '0.65rem'
  }), [])


  return (
    <>
      <div data-placeholder={'- JWT header'}
           className={`input-area decoded-jwt-header ${decodedJWT.header ? 'has-text' : ''}`}>
        <Editor value={ decodedJWT.header }
                onValueChange={ code => onDecodedJWTChange('header', code) }
                highlight={ code => highlight(code, languages.js) }
                padding={0}
                style={ editorStyle } />
      </div>

      <div data-placeholder={'- JWT claim'} data-errormessage={ decodedJWT.error }
           className={`input-area decoded-jwt-claim ${decodedJWT?.claim ? 'has-text' : ''} ${decodedJWT.error ? 'has-error' : ''}`}>
        <Editor value={ decodedJWT.claim }
                onValueChange={code => onDecodedJWTChange('claim', code)}
                highlight={code => highlight(code, languages.js)}
                padding={0}
                style={ editorStyle } />
      </div>
    </>
  )
}

export default DecodedJWT;