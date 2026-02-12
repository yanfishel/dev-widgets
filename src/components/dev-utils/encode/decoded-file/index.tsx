import React, {memo} from 'react';

import {useDevUtilsStore} from "@/store";
import FileContainer from "./file-container";
import FileDropZone from "./file-drop-zone";

import './style.css'


const DecodedFile = () => {

  const decodedError = useDevUtilsStore(({decodedError}) => decodedError)


  return (
    <>
      { decodedError &&
        <div className={"decoded-file-container"}>
          <div className={"file-error-message"}>{ decodedError }</div>
        </div>
      }

      <FileContainer />

      <FileDropZone />
    </>
  )
}

export default memo(DecodedFile)