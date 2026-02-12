import React, {useCallback, useMemo} from 'react';

import {useDevUtilsStore} from "@/store";
import {createFileFromBase64, debounce, jwtDecode, jwtDecodeHeader, textareaValue} from "@/utils";

import './style.css'


const EncodedText = () => {

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const encodedText = useDevUtilsStore(({encodedText}) => encodedText)
  const encodedError = useDevUtilsStore(({encodedError}) => encodedError)


  const onTextChange = useCallback((text:string) => {
    if(!text) {
      return
    }
    if(encodingType === 'URL') {
      useDevUtilsStore.setState(state => ({...state, ...{ decodedText:decodeURIComponent(text)}}) )
    } else if(encodingType === 'base64') {
      const file = createFileFromBase64(text)
      if (!file) {
        useDevUtilsStore.setState(state => ({...state, ...{decodedFile: null, decodedError: 'File decode error'}}))
      } else {
        useDevUtilsStore.setState(state => ({...state, ...{decodedFile: file, decodedError: ''}}))
      }
    } else if(encodingType === 'JWT') {
      const header = jwtDecodeHeader(text)
      const claim = jwtDecode(text)
      if(header || claim) {
        useDevUtilsStore.setState(state => ({...state, decodedJWT: {header, claim}}))
      }
    }
  }, [encodingType])

  const onChangeHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const encodedText = textareaValue(e)
    useDevUtilsStore.setState(state => ({...state, encodedText}) )
    debounceTextChange(encodedText)
  }

  const debounceTextChange = useCallback(debounce(onTextChange, 250), [encodingType])

  const placeholder = useMemo(
    ()=>  encodingType==='URL' ? '- Encoded URL' : encodingType==='JWT' ? '- JWT Token' : '- Encoded File',
    [encodingType]
  )


  return (
    <textarea className={`input-area encoded-text-editable ${ encodedError ? 'has-error' : ''}`}
              spellCheck={ false }
              contentEditable={ true }
              placeholder={ placeholder }
         data-errormessage={"Invalid JSON"}

         onChange={ onChangeHandler }
         value={ encodedText } />
  )
}

export default EncodedText;