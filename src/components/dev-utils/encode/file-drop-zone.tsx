import React, {memo, useState} from 'react';
import {DropFileIcon} from "@/assets";


interface IProps {
  onFileHandler: (file: File) => void
}
const FileDropZone = ({ onFileHandler }:IProps) => {

  const [dragOver, setDragOver] = useState(false)


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
      onFileHandler(file)
    }
  }

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