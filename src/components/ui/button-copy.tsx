import React from 'react';

import {ButtonCopyIcon} from "@/assets";


interface IProps {
  onClick: () => void
}
export const ButtonCopy = ({onClick}:IProps) => {

  return (
    <button onClick={onClick} className="circle-button copy-button">
      <ButtonCopyIcon />
      <ButtonCopyIcon hover />
    </button>
  )
}