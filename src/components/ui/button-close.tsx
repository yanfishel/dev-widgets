import React from 'react';
import {CloseIcon} from "@/assets";


interface IProps {
  onClick: () => void
}
export const ButtonClose = ({onClick}:IProps) => {

  return (
    <div className={"circle-button close-button"} onClick={onClick}>
      <CloseIcon/>
    </div>
  )
}
