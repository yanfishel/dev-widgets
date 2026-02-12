import React, {memo, useCallback, useState} from 'react';

import {useDevUtilsStore} from "@/store";
import {filetoBase32, fileToBase64} from "@/utils";
import {DropFileIcon} from "@/assets";


const FileDropZone = () => {

  const [dragOver, setDragOver] = useState(false)

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const reset = useDevUtilsStore(({reset}) => reset)

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true)
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false)
  }

  const dropFileHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false)
    const file = e.dataTransfer?.files[0]
    if(file ) {
      encodeFile(file)
    }
  }

  const encodeFile = useCallback(async (file: File) => {
    if(encodingType !== 'base32' && encodingType !== 'base64') {
      return
    }
    reset()
    useDevUtilsStore.setState(state => ({...state, processing: true}))
    const result = encodingType === 'base64'
      ? await fileToBase64(file)
      : await filetoBase32(file)
    if(result){
      useDevUtilsStore.setState(state => ({...state, ...{ processing: false, decodedFile:file, encodedText: result.toString()}}) )
    } else {
      useDevUtilsStore.setState(state => ({...state, ...{ processing: false, encodedError: 'File encode error'}}) )
    }

  }, [encodingType])


  return (
    <div onDragEnter={ dragEnterHandler }
         onDragOver={ dragEnterHandler }
         onDragLeave={ dragLeaveHandler }
         onDrop={ dropFileHandler } className={`drag-zone ${dragOver ? 'highlight' : ''}`}>
      <div className="placeholder">
        <DropFileIcon />
        Drop file to encode
      </div>
      <input type="file" id="file-input" style={{display: "none"}}/>
    </div>
  )
}

export default memo(FileDropZone)