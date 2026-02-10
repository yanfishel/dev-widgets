import React from 'react';

import { ButtonTrashIcon} from "@/assets";

interface IProps {
  title?: string
  onClick: () => void
}
export const ButtonTrash = ({title = 'Clear', onClick}:IProps) => {

  return (
    <button title={ title } onClick={ onClick } className={"circle-button danger-button clear-button"}>
      <ButtonTrashIcon />
      <ButtonTrashIcon hover />
    </button>
  )
}