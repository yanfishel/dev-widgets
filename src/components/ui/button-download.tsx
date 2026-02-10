import React from 'react';

import { DownloadIcon } from "@/assets";


interface IProps {
  onClick: () => void
}
export const ButtonDownload = ({onClick}:IProps) => {

  return (
    <button title={"Download file"}
            onClick={onClick}
            className={"circle-button download-button"}>
      <DownloadIcon />
    </button>
  )
}