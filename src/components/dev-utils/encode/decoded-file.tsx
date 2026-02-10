import React, {memo, useEffect, useMemo} from 'react';
import {IMAGES_MIME} from "@/constants";
import {DocumentFileIcon, documentIcon} from "@/assets";
import {formatBytes} from "@/utils";


interface IProps {
  file: File
}
const DecodedFile = ({ file }:IProps) => {


  const FileView = useMemo(() => {

    if(typeof file !== 'string' && 'type' in file) {
      if(!IMAGES_MIME.includes(file.type)) {
        const wrap = document.createElement('span')
        wrap.innerHTML = documentIcon
        return <span><DocumentFileIcon /></span>
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
    return <img src={image.src} alt={file.name} />

  }, [file])

  return (
    <div className={"decoded-file-container"}>
      { FileView }
      <div>
        <p>{ file.name ?? `decoded-file.${ file.type.split('/')[1] || '' }` }</p>
      </div>
      <div>{ formatBytes(file.size) }</div>
    </div>
  )
}

export default memo(DecodedFile)