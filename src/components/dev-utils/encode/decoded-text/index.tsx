import React, {memo} from 'react';

import {useDevUtilsStore} from "@/store";
import {debounce, textareaValue } from "@/utils";


const DecodedText = () => {

  const decodedURL = useDevUtilsStore(({decodedURL}) => decodedURL)

  const encodeUrl = (text:string)=>{
    useDevUtilsStore.setState({encodedURL: { text:encodeURIComponent(text), error:''}})
  }

  const debounceEncodeUrl = debounce(encodeUrl, 250)

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const decodedText = textareaValue(e)
    useDevUtilsStore.setState({ decodedURL: { url:decodedText, error:'' } })
    debounceEncodeUrl(decodedText)
  }


  return (
    <textarea className={`input-area decoded-text-editable`}
              placeholder={'- Decoded URL'}
              spellCheck={'false'} value={ decodedURL.url } onChange={ onChangeHandler }  >
    </textarea>
  )
}

export default memo(DecodedText)