import React, {JSX, memo, useEffect, useState} from 'react';

import {IMAGES_MIME} from "@/constants";
import {useDevUtilsStore} from "@/store";
import {formatBytes} from "@/utils";
import {DocumentFileIcon } from "@/assets";


const FileContainer = () => {

  const [filePreview, setFilePreview] = useState<JSX.Element | null>(null)

  const decodedFile = useDevUtilsStore(({decodedFile}) => decodedFile)


  useEffect(() => {
    if(!decodedFile.file) return
    const { file } = decodedFile
    if(typeof file !== 'string' && 'type' in file) {
      if(!IMAGES_MIME.includes(file.type)) {
        setFilePreview( <span><DocumentFileIcon /></span> )
        return
      }
    }
    const image = new Image();
    image.src = typeof file === 'string' ? file : URL.createObjectURL(file)
    image.onload = function() {
      URL.revokeObjectURL(image.src);
    }
    image.onerror = function(error) {
      console.error('Error loading image:', error);
    }
    setFilePreview( <img src={image.src} alt={file.name} /> )

  }, [decodedFile.file])


  return decodedFile.file ? (
    <div className={"decoded-file-container"}>
      { filePreview }
      <div>
        <p>{ decodedFile?.file ? decodedFile.file.name ?? `decoded-file.${ decodedFile.file.type.split('/')[1] || '' }` : `decoded-file` }</p>
      </div>
      <div>{ decodedFile?.file ? formatBytes(decodedFile.file.size) : '' }</div>
    </div>
  ) : null
}

export default memo(FileContainer)