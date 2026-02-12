import React from 'react';

import { ButtonTrashIcon} from "@/assets";

interface IProps {
  title?: string
  onClick: () => void
  disabled?: boolean
  className?: string
}
export const ButtonTrash = ({title = 'Clear', onClick, disabled, className}:IProps) => {

  return (
    <button title={ title }
            disabled={ disabled }
            onClick={ onClick }
            className={`circle-button danger-button clear-button ${className || ''}`}>
      <ButtonTrashIcon />
      <ButtonTrashIcon hover />
    </button>
  )
}