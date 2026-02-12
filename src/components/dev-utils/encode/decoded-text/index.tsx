import React, {memo} from 'react';

import {useDevUtilsStore} from "@/store";
import {debounce, textareaValue } from "@/utils";



const DecodedText = () => {

  const decodedText = useDevUtilsStore(({decodedText}) => decodedText)

  const encodeUrl = (text:string)=>{
    useDevUtilsStore.setState({encodedText: encodeURIComponent(text)})
  }

  const debounceEncodeUrl = debounce(encodeUrl, 250)

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const decodedText = textareaValue(e)
    useDevUtilsStore.setState({decodedText})
    debounceEncodeUrl(decodedText)
  }


  return (
    <textarea className={`input-area decoded-text-editable`}
              placeholder={'- Decoded URL'}
              spellCheck={'false'} value={ decodedText } onChange={ onChangeHandler }  >
    </textarea>
  )
}

export default memo(DecodedText)