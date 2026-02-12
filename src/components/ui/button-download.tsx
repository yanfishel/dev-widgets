import React from 'react';

import { DownloadIcon } from "@/assets";


interface IProps {
  onClick: () => void
  disabled?: boolean
}
export const ButtonDownload = ({onClick, disabled}:IProps) => {

  return (
    <button title={"Download file"}
            disabled={disabled}
            onClick={onClick}
            className={"circle-button download-button"}>
      <DownloadIcon />
    </button>
  )
}