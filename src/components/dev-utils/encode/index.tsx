import React, {InputEventHandler, memo, useCallback, useMemo, useState} from 'react';

import './style.css'
import {ButtonCopy, ButtonTrash, ButtonDownload, Loader} from "@components/ui";
import {DownloadIcon, DropFileIcon} from "@/assets";
import {useDevUtilsStore} from "@/store";

import EncodingTypeSelect from "./encoding-type-select";
import {createFileFromBase64, debounce, filetoBase32, fileToBase64, formatBytes} from "@/utils";
import DecodedFile from "@components/dev-utils/encode/decoded-file";
import FileDropZone from "@components/dev-utils/encode/file-drop-zone";
import EncodedEditable from "@components/dev-utils/encode/encoded-editable";


const Encode = () => {

  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File>()
  const [fileError, setFileError] = useState('')
  const [decoded, setDecoded] = useState<{ file:File|null, error:string }>({ file:null, error:'' })
  const [encoded, setEncoded] = useState({ text:'', error:false })

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const updateEncodingType = useDevUtilsStore(({updateEncodingType}) => updateEncodingType)


  const encodeFile = useCallback(async (file: File) => {
    if(encodingType !== 'base32' && encodingType !== 'base64') {
      return
    }
    setLoading( true )
    setDecoded({ file:null, error:'' })
    setEncoded({text:'', error:false})
    const result = encodingType === 'base64'
      ? await fileToBase64(file)
      : await filetoBase32(file)
    if(result){
      setDecoded({ file:file, error:'' })
      setEncoded({ text: result.toString(), error: false })
    } else {
      setEncoded({ text:'', error:true })
    }
    setLoading( false )
  }, [encodingType])

  const decodeFile = useCallback((text:string) => {
    if(!text.trim() || encodingType !== 'base64') {
      return
    }
    setLoading( true )
    setDecoded({ file:null, error:'' })
    const file = createFileFromBase64(text.trim())
    if(!file) {
      setDecoded({ file:null, error:'File decode error' })
    } else {
      setDecoded({file, error: ''})
    }
    setLoading( false)

  }, [encodingType])

  //const debounceDecodeFile = useCallback(debounce(decodeFile, 250), [])


  const encodedOnChangeHandler = useCallback((text:string) => {

    setEncoded({ text, error:false })

    if(encodingType === 'base64') {

      decodeFile(text)
    }
  }, [encodingType])


  return (
    <div className={`container encode-container has-file encode-type-${encodingType} ${decoded.file ? 'has-file' : ''}`}>

      { loading && <Loader /> }

      <div className="control-bar">
        <div className="title">Decoded</div>
        <EncodingTypeSelect value={encodingType}
                            onChange={updateEncodingType} />
      </div>

      <div className={"decoded-container"}>

        <div className={"action-bar"}>
          <ButtonDownload onClick={() => null}/>
          <ButtonCopy onClick={() => null}/>
          <ButtonTrash onClick={() => null}/>
        </div>

        { decoded.error && <div className={"file-error-message"}>{ decoded.error }</div> }

        { decoded.file && <DecodedFile file={decoded.file} /> }
        <FileDropZone onFileHandler={ encodeFile } />

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

        {/*<div className={`input-area encoded-text-editable ${ encoded.text ? 'has-text' :  '' } ${ encoded.error ? 'has-error' : ''}`}
             spellCheck={ false }
             contentEditable={ true }
             data-placeholder-jwt={"- JWT Token"}
             data-placeholder-url={"- Encoded URL"}
             data-placeholder-file={"- Encoded File"}
             data-errormessage={"Invalid JSON"}
             onKeyUp={ encodedInputHandler }
             dangerouslySetInnerHTML={{ __html: encoded.text }} />*/}

        <EncodedEditable text={encoded.text} error={encoded.error} onChange={encodedOnChangeHandler} />

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