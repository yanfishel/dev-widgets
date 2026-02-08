import React from 'react';

import {ButtonCopyIcon} from "@/assets";


export const ButtonCopy = () => {

  return (
    <button className="circle-button copy-button">
      <ButtonCopyIcon />
      <ButtonCopyIcon hover />
    </button>
  )
}