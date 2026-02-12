import React from 'react';

import {ButtonCopyIcon} from "@/assets";


interface IProps {
  onClick: () => void
  disabled?: boolean
}
export const ButtonCopy = ({onClick, disabled}:IProps) => {

  return (
    <button title={"Copy to clipboard"} disabled={disabled} onClick={onClick} className="circle-button copy-button">
      <ButtonCopyIcon />
      <ButtonCopyIcon hover />
    </button>
  )
}