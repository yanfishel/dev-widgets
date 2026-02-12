import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {useDevUtilsStore, useGlobalStore} from "@/store";
import {E_THEME} from "@/constants";
import './style.css'

const DecodedJWT = () => {

  const selectedTheme = useGlobalStore((state) => state.selectedTheme)
  const decodedJWT = useDevUtilsStore(({decodedJWT}) => decodedJWT)


  return (
    <>
      <SyntaxHighlighter language={"javascript"}
                         children={ decodedJWT?.header ?? '' }
                         codeTagProps={{
                           contentEditable: true,
                           spellCheck: false,
                           onBlur: (e)=>{
                             console.log(e)
                           },
                           'data-placeholder':"- JWT header",
                           className: `${decodedJWT?.header ? 'has-text' : ''}`
                         } as React.HTMLProps<HTMLElement>}
                         customStyle={{ height:'55px', minHeight:'55px', maxHeight:'55px'}}
                         style={ selectedTheme === E_THEME.DARK ? a11yDark : a11yLight } />

      <SyntaxHighlighter language={"javascript"}
                         children={ decodedJWT?.claim ?? '' }
                         codeTagProps={{
                           contentEditable: true,
                           spellCheck: false,
                           onBlur: (e)=>{
                             console.log(e)
                           },
                           'data-placeholder':"- JWT claim",
                           className: `${decodedJWT?.claim ? 'has-text' : ''}`
                         } as React.HTMLProps<HTMLElement>}
                         customStyle={{ height:'80px', minHeight:'80px', maxHeight:'80px'}}
                         style={ selectedTheme === E_THEME.DARK ? a11yDark : a11yLight } />
    </>
  )
}

export default DecodedJWT;