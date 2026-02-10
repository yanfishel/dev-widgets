import React from 'react';

import { ButtonDownloadIcon } from "@/assets";


interface IProps {
  onClick: () => void
}
export const ButtonDownload = ({onClick}:IProps) => {

  return (
    <button title={"Download file"} onClick={onClick} className={"circle-button download-button"}>
      <ButtonDownloadIcon />
      <ButtonDownloadIcon hover />
    </button>
  )
}