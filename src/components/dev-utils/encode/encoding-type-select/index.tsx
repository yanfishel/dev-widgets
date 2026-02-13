import React, {memo} from 'react';

import {encodingSelectOptions} from "@/utils";
import {useDevUtilsStore} from "@/store";

import './style.css'


const EncodingTypeSelect = () => {

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const updateEncodingType = useDevUtilsStore(({updateEncodingType}) => updateEncodingType)


  return (
    <div className="encode-type-container">
      <select value={ encodingType }
              onChange={(e) => updateEncodingType(e.target.value as T_EncodingType)} >
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