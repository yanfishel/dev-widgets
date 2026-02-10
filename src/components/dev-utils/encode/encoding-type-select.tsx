import React, {memo} from 'react';

import {encodingSelectOptions} from "@/utils";


interface IProps {
  value: string
  onChange: (value: T_EncodingType) => void
}
const EncodingTypeSelect = ({value, onChange}:IProps) => {

  return (
    <div className="encode-type-container">
      <select value={ value } onChange={(e) => onChange(e.target.value as T_EncodingType)} >
        { encodingSelectOptions().map(group =>
          <optgroup key={ group.type } label={ group.type.toUpperCase() }>
            { group.options.map(option =>
              <option key={option.value} value={option.value}>{option.label}</option>
            ) }
          </optgroup>
        ) }
      </select>
    </div>
  )
}

export default memo(EncodingTypeSelect)