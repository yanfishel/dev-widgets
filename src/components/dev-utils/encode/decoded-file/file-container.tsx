import React, {JSX, memo, useEffect, useState} from 'react';

import {IMAGES_MIME} from "@/constants";
import {useDevUtilsStore} from "@/store";
import {formatBytes} from "@/utils";
import {DocumentFileIcon } from "@/assets";



const FileContainer = () => {

  const [filePreview, setFilePreview] = useState<JSX.Element | null>(null)

  const decodedFile = useDevUtilsStore(({decodedFile}) => decodedFile)


  useEffect(() => {
    if(!decodedFile) return
    if(typeof decodedFile !== 'string' && 'type' in decodedFile) {
      if(!IMAGES_MIME.includes(decodedFile.type)) {
        setFilePreview( <span><DocumentFileIcon /></span> )
        return
      }
    }
    const image = new Image();
    image.src = typeof decodedFile === 'string' ? decodedFile : URL.createObjectURL(decodedFile)
    image.onload = function() {
      URL.revokeObjectURL(image.src);
    }
    image.onerror = function(error) {
      console.error('Error loading image:', error);
    }
    setFilePreview( <img src={image.src} alt={decodedFile.name} /> )

  }, [decodedFile])


  return decodedFile ? (
    <div className={"decoded-file-container"}>
      { filePreview }
      <div>
        <p>{ decodedFile.name ?? `decoded-file.${ decodedFile.type.split('/')[1] || '' }` }</p>
      </div>
      <div>{ formatBytes(decodedFile.size) }</div>
    </div>
  ) : null
}

export default memo(FileContainer)