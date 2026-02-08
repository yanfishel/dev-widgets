import React from 'react';

import { ButtonTrashIcon} from "@/assets";

interface IProps {
  onClick: () => void
}
export const ButtonTrash = ({onClick}:IProps) => {

  return (
    <button onClick={ onClick } className="circle-button danger-button clear-button">
      <ButtonTrashIcon />
      <ButtonTrashIcon hover />
    </button>
  )
}