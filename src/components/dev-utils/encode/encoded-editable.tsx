import React, {memo, useEffect, useState} from 'react';


interface IProps {
  text: string
  error: boolean
  onChange: (text:string) => void
}

const EncodedEditable = ({ text, error, onChange }:IProps) => {

  const [textValue, setTextValue] = useState(text)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blurHandler = (e:any) => {
    const { textContent } = e.target as HTMLElement
    setTextValue(textContent)
    onChange(textContent)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /*const keyUpHandler = (e:any) => {
    //const { textContent } = e.target as HTMLElement
    //setTextValue(textContent)
    //onKeyUp(textContent)
  }*/



  return (
    <div className={`input-area encoded-text-editable ${ textValue ? 'has-text' :  '' } ${ error ? 'has-error' : ''}`}
         spellCheck={ false }
         contentEditable={ true }
         data-placeholder-jwt={"- JWT Token"}
         data-placeholder-url={"- Encoded URL"}
         data-placeholder-file={"- Encoded File"}
         data-errormessage={"Invalid JSON"}

         //onChange={ keyUpHandler }
         //onInput={ keyUpHandler }
         onBlur={ blurHandler }
         dangerouslySetInnerHTML={{ __html: text }} />
  )
}

export default memo(EncodedEditable)