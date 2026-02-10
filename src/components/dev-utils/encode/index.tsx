import React, {memo, useMemo, useState} from 'react';

import './style.css'
import {ButtonCopy, ButtonTrash, ButtonDownload} from "@components/ui";
import {DownloadIcon} from "@/assets";
import {useDevUtilsStore} from "@/store";

import EncodingTypeSelect from "./encoding-type-select";


const Encode = () => {

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const updateEncodingType = useDevUtilsStore(({updateEncodingType}) => updateEncodingType)


  return (
    <div className={`container encode-container encode-type-${encodingType}`}>
      <div className="control-bar">

        <div className="title">Decoded</div>

        <EncodingTypeSelect value={encodingType} onChange={updateEncodingType} />

      </div>

      <div className="decoded-container">

        <div className="action-bar">
          <ButtonDownload onClick={() => null}/>
          <ButtonCopy onClick={() => null}/>
          <ButtonTrash onClick={() => null}/>
        </div>

        <div className="file-error-message">File decode error</div>
        <div className="decoded-file-container"></div>

        <div className="drag-zone">
          <div className="placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <path d="m7 10l5 5l5-5"/>
              </g>
            </svg>
            <DownloadIcon />
            Drop file to encode
          </div>
          <input type="file" id="file-input" style={{display: "none"}}/>
        </div>

        <div className="input-area decoded-jwt-header-editable"
             spellCheck="false"
             contentEditable="true"
             data-placeholder-jwt="- JWT header"
             data-errormessage="JWT Header Token Invalid">
        </div>
        <div className="input-area decoded-text-editable language-json"
             spellCheck="false"
             contentEditable="true"
             data-placeholder-jwt="- JWT claim"
             data-placeholder-url="- URL"
             data-errormessage="JWT Token Invalid">
        </div>

      </div>

      <div className="title">Encoded</div>
      <div className="encoded-container">

        <div className="action-bar">
          <ButtonCopy onClick={() => null}/>
          <ButtonTrash onClick={() => null}/>
        </div>

        <div className="input-area encoded-text-editable"
             spellCheck="false" contentEditable="true"
             data-placeholder-jwt="- JWT Token"
             data-placeholder-url="- Encoded URL"
             data-placeholder-file="- Encoded File"
             data-errormessage="Invalid JSON">
        </div>

      </div>

      <div className="signature-container">
        <div className="signature-button">Signature</div>
        <div className="signature-modal">
          <label>Sekret key</label>
          <input type="text" name="signature-secret"/>
        </div>
      </div>


      <div className="action-bar clear-all">
        <ButtonTrash title={'Clear All'} onClick={() => null}/>
      </div>

    </div>
  )
}

export default memo(Encode)