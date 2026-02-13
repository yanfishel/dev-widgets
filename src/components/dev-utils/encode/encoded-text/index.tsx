import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {E_EncodingTypes} from "@/constants";
import {useDevUtilsStore} from "@/store";
import {createFileFromBase64, debounce, jwtDecode, jwtDecodeHeader, textareaValue} from "@/utils";

import './style.css'


const EncodedText = () => {

  const [errorMessages, setErrorMessages] = useState('')

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const encodedJWT = useDevUtilsStore(({encodedJWT}) => encodedJWT)
  const encodedURL = useDevUtilsStore(({encodedURL}) => encodedURL)
  const encodedFile = useDevUtilsStore(({encodedFile}) => encodedFile)


  const onTextChange = useCallback((text:string) => {
    if(!text) {
      return
    }
    if(encodingType === E_EncodingTypes.JWT) {
      const header = jwtDecodeHeader(text)
      const claim = jwtDecode(text)
      if(header && claim) {
        useDevUtilsStore.setState(state => ({
          ...state,
          decodedJWT: { ...state.decodedJWT, ...{ header, claim } }
        }))
      } else {
        useDevUtilsStore.setState(state => ({...state, decodedJWT: { ...state.decodedJWT, header: '', claim: '', error: 'JWT decode error' }}))
      }
    } else if(encodingType === E_EncodingTypes.URL) {
      useDevUtilsStore.setState({ decodedURL: { url:decodeURIComponent(text), error: ''} })
    } else if(encodingType === E_EncodingTypes.base64) {
      const file = createFileFromBase64(text)
      if (!file) {
        useDevUtilsStore.setState({ decodedFile: { file:null, error: 'File decode error' }} )
      } else {
        useDevUtilsStore.setState({ decodedFile: { file, error: '' }} )
      }
    }
  }, [encodingType])

  const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = textareaValue(e)
    const encoded = { text, error: '' }
    if(encodingType === E_EncodingTypes.JWT) {
      useDevUtilsStore.setState(state => ({...state, encodedJWT: encoded }) )
    } else if(encodingType === E_EncodingTypes.URL) {
      useDevUtilsStore.setState(state => ({...state, encodedURL: encoded }) )
    } else {
      useDevUtilsStore.setState(state => ({...state, encodedFile: encoded }) )
    }
    debounceTextChange(text)
  }

  const debounceTextChange = useCallback(debounce(onTextChange, 250), [encodingType])

  const placeholder = useMemo( ()=>
      encodingType===E_EncodingTypes.URL ? '- Encoded URL' : encodingType===E_EncodingTypes.JWT ? '- JWT Token' : '- Encoded File',
    [encodingType])


  useEffect(() => {
    if(encodedJWT.error || encodedURL.error || encodedFile.error) {
      setErrorMessages(encodedJWT.error ? encodedJWT.error : encodedURL.error ? encodedURL.error : encodedFile.error ? encodedFile.error : '- Invalid JSON')
    } else {
      setErrorMessages('')
    }
  }, [encodedJWT.error, encodedURL.error, encodedFile.error])


  return (
    <textarea className={`input-area encoded-text-editable ${ errorMessages ? 'has-error' : ''}`}
              spellCheck={ false }
              contentEditable={ true }
              placeholder={ errorMessages ? errorMessages : placeholder }
              data-errormessage={ errorMessages }
              onChange={ onChangeHandler }
              value={ encodingType === E_EncodingTypes.URL ? encodedURL.text : encodingType === E_EncodingTypes.JWT ? encodedJWT.text : encodedFile.text } />
  )
}

export default EncodedText;