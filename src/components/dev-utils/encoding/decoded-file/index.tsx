import React, {memo} from 'react';

import {useDevUtilsStore} from "@/store";
import FileContainer from "./file-container";
import FileDropZone from "./file-drop-zone";

import './style.css'


const DecodedFile = () => {

  const decodedFile = useDevUtilsStore(({decodedFile}) => decodedFile)


  return (
    <>
      { decodedFile.error &&
        <div className={"decoded-file-container"}>
          <div className={"file-error-message"}>{ decodedFile.error }</div>
        </div>
      }

      <FileContainer />

      <FileDropZone />
    </>
  )
}

export default memo(DecodedFile)